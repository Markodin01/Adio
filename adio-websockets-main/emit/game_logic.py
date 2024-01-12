import math
import time
import api
import random
import asyncio
import threading
from game_round import GameRound
from track import Track
from websocket import broadcast_message
from shared_rooms import game_rooms


async def prepare_game(game_room):
    """
    Inform all clients
    """
    await broadcast_message(game_room, {'type': 'game_started'})

    """
    Game setup
    """
    # Get game room settings
    game_room_settings = game_room.get_settings()
    # Get game room clients
    clients = game_room.get_clients()
    # Get game room playlist_id
    playlist_id = game_room.get_playlist_id()
    # Get game room playlist tracks
    playlist_tracks = api.get_playlist_tracks(playlist_id)
    # Get game room playlist tracks length
    playlist_tracks_length = len(playlist_tracks)
    # Get total rounds number
    total_rounds = game_room_settings['game_room_total_rounds']

    if total_rounds > playlist_tracks_length:
        total_rounds = playlist_tracks_length

    # Get question depending on game_type
    if game_room.get_game_type() == "guess the song":
        question = "What's playing?"
        attr = "title"
    elif game_room.get_game_type() == "guess the artist":
        question = "Who's the artist?"
        attr = "artist"
    elif game_room.get_game_type() == "guess the album":
        question = "What's the album?"
        attr = "album"

    # Make tracks objects
    random.shuffle(playlist_tracks)
    tracks = []
    for track in playlist_tracks:
        tracks.append(Track(**track))
        
    game_rounds = []
    round_number = 1

    for track in tracks:
        if round_number == total_rounds + 1:
            break
        game_rounds.append(GameRound(round_number, question, create_answers(tracks, track, attr), getattr(
            track, attr), track))
        round_number += 1

    game_room.rounds = game_rounds

    return game_rounds

async def start_game(game_room, game_rounds, total_rounds):
    round_duration = game_room.round_duration
    reveal_answer_duration = 5

    # Start game loop
    for round_number in range(total_rounds):
        # Check if game_room still exists
        if game_room in game_rooms.rooms:
            loop = asyncio.get_event_loop()
            round_start_time = round_duration * round_number + reveal_answer_duration * round_number
            loop.call_later(round_start_time, lambda round_number=round_number: asyncio.ensure_future(start_round(game_rounds[round_number], game_room, round_duration)))

    # Calculate delay for sending results
    total_game_duration = total_rounds * (round_duration + reveal_answer_duration)

    # Schedule call to send results
    loop.call_later(total_game_duration, lambda: asyncio.ensure_future(broadcast_message(game_room, game_room.get_game_result())))


async def start_round(game_round, game_room, round_duration):
    """ Start a new round. """
    game_room.set_current_round(game_round)
    # Send round info to clients
    print('\nSending round info')
    print(game_round.get_round_info())
    await broadcast_message(game_room, game_round.get_round_info())
    # Start timer
    start_time = time.time()
    game_round.round_start_time = start_time

    # Schedule sending of round results
    loop = asyncio.get_event_loop()
    loop.call_later(round_duration, lambda: asyncio.ensure_future(send_round_result(game_room, game_round)))


"""
OTHER HELPER FUNCTIONS
"""

async def send_round_result(game_room, game_round):
    """
    Send scores to all clients
    """
    scores = game_room.get_clients_scores()
    # TODO: send scores with client names
    print(f'\nSending round result: {game_round.round_answer}')
    await broadcast_message(game_room, {'type': 'round_result', 'answer': game_round.round_answer, 'clients_scores': scores})

def create_answers(tracks, answer_track, attr):
    """
    Create answers for a round, as an array of 4 elements
    """
    answers = [getattr(answer_track, attr)]
    other_tracks = [getattr(track, attr)
                    for track in tracks if track != answer_track]
    answers.extend(random.sample(set(other_tracks), 3))
    random.shuffle(answers)
    return answers


def calculate_score(game_round, answer):
    """
    Calculate score based on answer time
    """
    if game_round.round_answer == answer:
        elapsed_time = time.time() - game_round.round_start_time
        if (elapsed_time <= 1.5):
            score = 1000
        else:
            score = 500 + 500 / math.log(elapsed_time, 1.5)
    else:
        score = 0

    return score
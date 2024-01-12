import pytest
import json
import asyncio
import random
import string
from unittest.mock import Mock
from emit.game_logic import calculate_score
from emit.shared_rooms import game_rooms
from emit.game_room import GameRoom
from emit.client import Client
from emit.websocket import send_message, broadcast_message
from emit.websocket_service import (
    create_game_room, join_game_room, get_players,
    update_game_room_settings, get_game_room_settings,
    get_game_room_settings_and_clients, get_game_room,
    send_answer, leave_game_room, generate_game_room_id,
    send_clients, send_clients_with_scores
)

@pytest.fixture
def event_loop():
    loop = asyncio.get_event_loop()
    yield loop
    loop.close()


@pytest.fixture
def game_room(event_loop):
    game_room_id = generate_game_room_id()
    game_room_name = "test_game_room"
    game_room_settings = {
            'game_room_name': 'dwadw', 'game_room_type': 'Guess the Song', 'game_room_playlist': '1306931615',
            'game_room_visibility': 'private', 'game_room_id': 'wlevftjf'
        }
    game_room = GameRoom(game_room_id, game_room_name, game_room_settings)
    client1 = Client(Mock())
    client2 = Client(Mock())
    game_room.add_client(client1)
    game_room.add_client(client2)
    game_rooms.add_room(game_room)
    yield game_room
    game_rooms.remove_room(game_room)

def test_create_game_room(event_loop):
    data = {'game_room_settings': {'number_of_rounds': 3, 'time_per_round': 10, 'game_room_name': 'test_game_room'}}
    client = Client(Mock())
    game_room = event_loop.run_until_complete(create_game_room(data, client))
    assert game_room.get_name() == 'test_game_room'
    assert game_room.get_settings()['number_of_rounds'] == 3
    assert game_room.get_settings()['time_per_round'] == 10
    assert game_rooms.get_room(game_room.get_id()) == game_room


def test_join_game_room(event_loop, game_room):
    data = {'game_room_id': game_room.get_id()}
    client = Client(Mock())
    event_loop.run_until_complete(join_game_room(data, client))
    assert client in game_room.get_clients()
    assert len(game_room.get_clients()) == 3


def test_join_game_room_with_invalid_id(event_loop):
    data = {'game_room_id': 'invalid_id'}
    client = Client(Mock())
    response = event_loop.run_until_complete(join_game_room(data, client))
    assert response == {'status': 'failure', 'message': 'Invalid game room ID'}


def test_get_players(event_loop, game_room):
    websocket = Mock()
    event_loop.run_until_complete(get_players(game_room))
    message = json.loads(websocket.send_message.call_args[0][0])
    assert message['type'] == 'players'
    assert len(message['players']) == 2


def test_update_game_room_settings(event_loop, game_room):
    data = {'game_room_settings': {'number_of_rounds': 5, 'time_per_round': 20, 'game_room_id': game_room.get_id()}}
    event_loop.run_until_complete(update_game_room_settings(data, game_room))
    assert game_room.get_settings()['number_of_rounds'] == 5
    assert game_room.get_settings()['time_per_round'] == 20
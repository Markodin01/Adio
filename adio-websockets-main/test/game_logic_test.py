import unittest
from emit import api
from emit import game_logic
from emit.game_room import GameRoom
import asyncio
import random
from unittest import mock
from mock import MagicMock
from emit.game_round import GameRound
from emit.track import Track
from emit.shared_rooms import game_rooms
from emit.game_logic import prepare_game
from emit.game_logic import *


class TestStartGame(unittest.TestCase):
    """
    FAKE GAME ROOM
    """
    game_room_info = {
        'game_room_settings': {
            'game_room_name': 'dwadw', 'game_room_type': 'Guess the Song', 'game_room_playlist': '1306931615',
            'game_room_visibility': 'private', 'game_room_id': 'wlevftjf'
        },
        'clients': ['client1', 'client2'],
    }
    game_room = GameRoom(game_room_info['game_room_settings']['game_room_name'],game_room_info['game_room_settings']['game_room_id'],game_room_info['game_room_settings'])

    def setUp(self):
        self.game_room = MagicMock()
        self.game_round = MagicMock()
        self.tracks = [MagicMock() for i in range(10)]
        self.answer_track = self.tracks[0]
        self.attr = 'artist'

    async def test_send_round_result(self):
        # Test sending round result
        await send_round_result(self.game_room, self.game_round)
        self.game_room.get_clients_scores.assert_called_once()
        self.assertTrue(self.game_round.round_answer in str(self.game_round.mock_calls[1]))
    
    def test_create_answers(self):
        # Test creating answers
        answers = create_answers(self.tracks, self.answer_track, self.attr)
        self.assertEqual(len(answers), 4)
        self.assertEqual(answers.count(self.answer_track.artist), 1)
        self.assertEqual(set(answers), set([t.artist for t in self.tracks]))
    
    def test_calculate_score(self):
        # Test calculating score
        self.game_round.round_answer = self.answer_track.artist
        self.game_round.round_start_time = 0
        score = calculate_score(self.game_round, self.answer_track.artist)
        self.assertEqual(score, 500)
        
        self.game_round.round_start_time = time.time() - 1
        score = calculate_score(self.game_round, self.answer_track.artist)
        self.assertGreater(score, 500)
        
        score = calculate_score(self.game_round, 'wrong answer')
        self.assertEqual(score, 0)

if __name__ == '__main__':
    unittest.main()

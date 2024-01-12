import unittest
from unittest.mock import Mock

from emit.game_room import GameRoom


class TestGameRoom(unittest.TestCase):
    def setUp(self):
        self.room_id = 1
        self.room_name = "Test Room"
        self.settings = {'game_room_playlist': 123, 'game_room_type': 'test'}
        self.room = GameRoom(self.room_id, self.room_name, self.settings)
        self.client1 = Mock(name="client1")
        self.client2 = Mock(name="client2")

    def test_add_client(self):
        self.room.add_client(self.client1)
        self.assertIn(self.client1, self.room.get_clients())

    def test_remove_client(self):
        self.room.add_client(self.client1)
        self.room.remove_client(self.client1)
        self.assertNotIn(self.client1, self.room.get_clients())

    def test_remove_client_by_websocket(self):
        self.client1.get_websocket.return_value = "ws1"
        self.client2.get_websocket.return_value = "ws2"
        self.room.add_client(self.client1)
        self.room.add_client(self.client2)
        self.assertTrue(self.room.remove_client_by_websocket("ws1"))
        self.assertNotIn(self.client1, self.room.get_clients())

    def test_get_client_by_websocket(self):
        self.client1.get_websocket.return_value = "ws1"
        self.room.add_client(self.client1)
        self.assertEqual(self.client1, self.room.get_client_by_websocket("ws1"))

    def test_get_client_by_name(self):
        self.client1.get_name.return_value = "client1"
        self.room.add_client(self.client1)
        self.assertEqual(self.client1, self.room.get_client_by_name("client1"))

    def test_change_client_websocket(self):
        old_ws = Mock(name="old_ws")
        new_ws = Mock(name="new_ws")
        self.client1.get_websocket.return_value = old_ws
        self.room.add_client(self.client1)
        self.assertTrue(self.room.change_client_websocket(old_ws, new_ws))
        self.assertEqual(new_ws, self.client1.get_websocket())

    def test_get_player_names(self):
        self.client1.get_name.return_value = "client1"
        self.client2.get_name.return_value = "client2"
        self.room.add_client(self.client1)
        self.room.add_client(self.client2)
        self.assertEqual(["client1", "client2"], self.room.get_player_names())

    def test_set_current_round(self):
        round = Mock(name="round")
        self.room.set_current_round(round)
        self.assertEqual(round, self.room.get_current_round())

    def test_get_id(self):
        self.assertEqual(self.room_id, self.room.get_id())

    def test_get_name(self):
        self.assertEqual(self.room_name, self.room.get_name())

    def test_get_playlist_id(self):
        self.assertEqual(self.settings['game_room_playlist'], self.room.get_playlist_id())

    def test_get_game_type(self):
        self.assertEqual(self.settings['game_room_type'], self.room.get_game_type())

    def test_get_settings(self):
        self.assertEqual(self.settings, self.room.get_settings())

    def test_get_scores(self):
        self.client1.get_score.return_value = 10
        self.client2.get_score.return_value = 20
        self.room.add_client(self.client1)
        self.room.add_client(self.client2)
        self.assertEqual([10, 20], self.room.get_scores())

    def test_get_clients_scores(self):
        self.client1.get_name.return_value = "client1"
        self.client2.get_name.return_value = "client2"
        self.client1.get_score.return_value = 10
        self.client2.get_score.return_value = 20
        
    def test_get_current_round_returns_none_when_current_round_is_none(self):
        self.assertIsNone(self.room.get_current_round())

    def test_get_current_round_returns_current_round_when_set(self):
        mock_round = Mock()
        self.room.set_current_round(mock_round)
        self.assertEqual(self.room.get_current_round(), mock_round)

    def test_get_game_result_returns_correct_format(self):
        mock_client_1 = Mock()
        mock_client_1.get_name.return_value = 'Player 1'
        mock_client_1.get_score.return_value = 5
        mock_client_2 = Mock()
        mock_client_2.get_name.return_value = 'Player 2'
        mock_client_2.get_score.return_value = 3
        self.room.add_client(mock_client_1)
        self.room.add_client(mock_client_2)

        expected_result = {
            'type': 'game_result',
            'clients': [
                {'name': 'Player 1', 'score': 5},
                {'name': 'Player 2', 'score': 3}
            ],
            'game_rounds': [],
            'playlist_id': 123
        }

        self.assertEqual(self.room.get_game_result(), expected_result)

    def test_get_game_room_info_returns_correct_format(self):
        mock_client_1 = Mock()
        mock_client_1.websocket.remote_address = ('127.0.0.1', 5000)
        mock_client_2 = Mock()
        mock_client_2.websocket.remote_address = ('127.0.0.1', 6000)
        self.room.add_client(mock_client_1)
        self.room.add_client(mock_client_2)

        expected_info = {
            'type': 'game_room',
            'game_room': {
                'id': 1,
                'name': 'Test Room',
                'playlist_id': 123,
                'game_type': 'test',
                'clients': ['127.0.0.1', '127.0.0.1'],
                'settings': {'game_room_playlist': 123, 'game_room_type': 'test'}
            }
        }

        self.assertEqual(self.room.get_game_room_info(), expected_info)
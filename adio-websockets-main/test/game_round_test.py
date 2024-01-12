import json
import unittest
from unittest.mock import MagicMock

from gameroom import GameRound


class TestGameRound(unittest.TestCase):
    def setUp(self):
        track = MagicMock()
        track.get_track_info.return_value = {
            'title': 'Little Bit of Love',
            'artist': 'Tom Grennan',
            'album': 'Little Bit of Love',
            'picture': 'https://api.deezer.com/album/193480222/image',
            'preview': 'https://cdns-preview-2.dzcdn.net/stream/c-255e99fa9d87e49d1173c8631bcce1e6-3.mp3',
            'link': 'https://www.deezer.com/track/1178675552',
            'id': 1178675552
        }
        self.round = GameRound(1, "What's playing?", ["Spit Of You", "Dancing On My Own", "Glimpse of Us", "Little Bit of Love"], "Little Bit of Love", track)

    def test_get_round_number(self):
        self.assertEqual(self.round.get_round_number(), 1)

    def test_get_round_track(self):
        self.assertEqual(self.round.get_round_track(), self.round.round_track)

    def test_get_round_question(self):
        self.assertEqual(self.round.get_round_question(), "What's playing?")

    def test_get_round_answer(self):
        self.assertEqual(self.round.get_round_answer(), "Little Bit of Love")

    def test_get_round_answers(self):
        self.assertEqual(self.round.get_round_answers(), ["Spit Of You", "Dancing On My Own", "Glimpse of Us", "Little Bit of Love"])

    def test_get_round_info(self):
        expected_result = json.dumps({
            'type': 'new_round',
            'round_number': 1,
            'round_question': "What's playing?",
            'round_answers': ["Spit Of You", "Dancing On My Own", "Glimpse of Us", "Little Bit of Love"],
            'round_answer': "Little Bit of Love",
            'round_track': {
                'title': 'Little Bit of Love',
                'artist': 'Tom Grennan',
                'album': 'Little Bit of Love',
                'picture': 'https://api.deezer.com/album/193480222/image',
                'preview': 'https://cdns-preview-2.dzcdn.net/stream/c-255e99fa9d87e49d1173c8631bcce1e6-3.mp3',
                'link': 'https://www.deezer.com/track/1178675552',
                'id': 1178675552
            }
        })
        self.assertEqual(self.round.get_round_info(), expected_result)

    def test_get_round_start_time(self):
        self.assertIsNone(self.round.get_round_start_time())

    def test_set_round_track(self):
        new_track = MagicMock()
        self.round.set_round_track(new_track)
        self.assertEqual(self.round.get_round_track(), new_track)

    def test_set_round_question(self):
        self.round.set_round_question("What's the song title?")
        self.assertEqual(self.round.get_round_question(), "What's the song title?")

    def test_set_round_answer(self):
        self.round.set_round_answer("Spit Of You")
        self.assertEqual(self.round.get_round_answer(), "Spit Of You")
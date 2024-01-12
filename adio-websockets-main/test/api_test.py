import json
import unittest
from unittest.mock import patch
from emit import api
import unittest
import deezer

class ApiTest(unittest.TestCase):

    # @patch('ws.get_playlist_tracks')
    def test_get_playlist_tracks(self):
        # Set up mock return value for get_playlist_tracks
        # mock_get_playlist_tracks.return_value = ['track1', 'track2', 'track3']

        result = api.get_playlist_tracks(self.game_room['game_room_settings']['game_room_playlist'])

        print(result)

        # Assert expected behavior
        self.assertEqual(len(result), 30422)
        
    def setUp(self):
        self.client = deezer.Client()
        self.access_token = "dummy_access_token"

    def test_search_tracks(self):
        result = api.search_tracks("Hello")
        self.assertIsInstance(result, deezer.resources.Search)
        
    def test_search_artists(self):
        result = api.search_artists("Adele")
        self.assertIsInstance(result, deezer.resources.Search)
        
    @patch('deezer.Client.get_user_playlists')
    @patch('deezer.Client.get_playlists_chart')
    def test_get_playlists_json(self, mock_chart, mock_user_playlists):
        mock_chart.return_value = [deezer.resources.Playlist({"id": 123, "title": "Top 100"})]
        mock_user_playlists.return_value = []
        result = json.loads(api.get_playlists_json(genre_id=0, access_token=self.access_token))
        self.assertEqual(result["type"], "playlists")
        self.assertEqual(len(result["playlists"]), 1)
        self.assertEqual(result["playlists"][0]["id"], 123)
        self.assertEqual(result["playlists"][0]["title"], "Top 100")
        
    def test_get_user_playlists(self):
        with self.assertRaises(deezer.exceptions.OAuthException):
            api.get_user_playlists(access_token=None)
            
    @patch('deezer.Client.get_user')
    def test_get_user_playlists_json(self, mock_get_user):
        mock_get_user.return_value.get_playlists.return_value = [deezer.resources.Playlist({"id": 456, "title": "My Playlist"})]
        result = json.loads(api.get_user_playlists_json(access_token=self.access_token))
        self.assertEqual(result["type"], "playlists")
        self.assertEqual(len(result["playlists"]), 1)
        self.assertEqual(result["playlists"][0]["id"], 456)
        self.assertEqual(result["playlists"][0]["title"], "My Playlist")
        
    @patch('deezer.Client.get_playlist')
    def test_get_playlist_tracks(self, mock_get_playlist):
        mock_tracks = [
            deezer.resources.Track({"title": "Hello", "artist": {"name": "Adele"}, "album": {"title": "25"}, "preview": "http://example.com/hello.mp3", "link": "http://example.com/hello", "id": 789}),
            deezer.resources.Track({"title": "Someone Like You", "artist": {"name": "Adele"}, "album": {"title": "21"}, "preview": None, "link": "http://example.com/someone-like-you", "id": 123}),
        ]
        mock_get_playlist.return_value.tracks = mock_tracks
        result = api.get_playlist_tracks("playlist_id")
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]["title"], "Hello")
        self.assertEqual(result[0]["artist"], "Adele")
        self.assertEqual(result[0]["album"], "25")
        self.assertEqual(result[0]["preview"], "http://example.com/hello.mp3")
        self.assertEqual(result[0]["link"], "http://example.com/hello")
        self.assertEqual(result[0]["id"], 789)


if __name__ == '__main__':
    unittest.main()

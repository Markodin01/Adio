import unittest
from unittest.mock import MagicMock
from emit.game_rooms import GameRooms

class TestGameRooms(unittest.TestCase):
    def setUp(self):
        self.rooms = GameRooms()

    def test_add_room(self):
        room = MagicMock()
        self.rooms.add_room(room)
        self.assertIn(room, self.rooms.get_rooms())

    def test_remove_room(self):
        room = MagicMock()
        self.rooms.add_room(room)
        self.rooms.remove_room(room)
        self.assertNotIn(room, self.rooms.get_rooms())

    def test_get_rooms(self):
        room1 = MagicMock()
        room2 = MagicMock()
        self.rooms.add_room(room1)
        self.rooms.add_room(room2)
        self.assertEqual(self.rooms.get_rooms(), {room1, room2})

    def test_get_room_existing(self):
        room1 = MagicMock()
        room1.get_id.return_value = 1
        room2 = MagicMock()
        room2.get_id.return_value = 2
        self.rooms.add_room(room1)
        self.rooms.add_room(room2)
        self.assertEqual(self.rooms.get_room(1), room1)
        self.assertEqual(self.rooms.get_room(2), room2)

    def test_get_room_non_existing(self):
        room = MagicMock()
        room.get_id.return_value = 1
        self.rooms.add_room(room)
        self.assertIsNone(self.rooms.get_room(2))

if __name__ == '__main__':
    unittest.main()
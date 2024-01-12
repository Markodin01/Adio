import unittest
import json
import asyncio
import websockets

class WebsocketServerTest(unittest.IsolatedAsyncioTestCase):

    async def test_create_game_room(self):
        async with websockets.connect('ws://localhost:8765') as websocket:
            data = {'type': 'create_game_room', 'user_name': 'test_user', 'game_room_settings': ''}
            await websocket.send(json.dumps(data))
            response = await websocket.recv()
            response_data = json.loads(response)
            self.assertEqual(response_data['status'], 'success')
            self.assertEqual(response_data['game_room']['id'], 1)

    async def test_join_game_room(self):
        async with websockets.connect('ws://localhost:8765') as websocket:
            data = {'type': 'join_game_room', 'user_name': 'test_user', 'game_room_id': 1}
            await websocket.send(json.dumps(data))
            response = await websocket.recv()
            response_data = json.loads(response)
            self.assertEqual(response_data['status'], 'success')
            self.assertEqual(response_data['game_room']['id'], 1)

    async def test_get_players(self):
        async with websockets.connect('ws://localhost:8765') as websocket:
            data = {'type': 'get_players'}
            await websocket.send(json.dumps(data))
            response = await websocket.recv()
            response_data = json.loads(response)
            self.assertEqual(response_data['status'], 'success')

    async def test_update_game_room_settings(self):
        async with websockets.connect('ws://localhost:8765') as websocket:
            data = {'type': 'update_game_room_settings', 'game_room_id': 1, 'game_room_settings': {'max_players': 6}}
            await websocket.send(json.dumps(data))
            response = await websocket.recv()
            response_data = json.loads(response)
            self.assertEqual(response_data['status'], 'success')

    async def test_get_game_room_settings(self):
        async with websockets.connect('ws://localhost:8765') as websocket:
            data = {'type': 'get_game_room_settings', 'game_room_id': 1}
            await websocket.send(json.dumps(data))
            response = await websocket.recv()
            response_data = json.loads(response)
            self.assertEqual(response_data['status'], 'success')

    async def test_get_game_room_settings_and_clients(self):
        async with websockets.connect('ws://localhost:8765') as websocket:
            data = {'type': 'get_game_room_settings_and_clients', 'game_room_id': 1}
            await websocket.send(json.dumps(data))
            response = await websocket.recv()
            response_data = json.loads(response)
            self.assertEqual(response_data['status'], 'success')

    async def test_leave_game_room(self):
        async with websockets.connect('ws://localhost:8765') as websocket:
            data = {'type': 'leave_game_room', 'game_room_id': 1}
            await websocket.send(json.dumps(data))
            response = await websocket.recv()
            response_data = json.loads(response)
            self.assertEqual(response_data['status'], 'success')

    async def test_start_game(self):
        async with websockets.connect('ws://localhost:8765') as websocket:
            data = {'type': 'start_game', 'game_room_id': 1}
            await websocket.send(json.dumps(data))
            response = await websocket.recv()
            response_data = json.loads(response)
            self.assertEqual(response_data['status'], 'success')


if __name__ == '__main__':
    unittest.main()

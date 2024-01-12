import asyncio
import json

from websocket_service import *
from api import get_playlists_json, get_user_info_json, get_user_playlists_json
from game_logic import *
from client import Client

from shared_rooms import game_rooms

async def websocket_request_handler(websocket):
    """
    Handle websocket requests
    """
    client = Client(websocket, None)
    game_room = None
    print(f"Websocket connected: {websocket}")

    try:
        async for message in websocket:

            print(
                f"\nMessage received: {message} from {websocket} in game room {game_room}")

            if message != None:
                data = json.loads(message)

            if data['type'] == 'create_game_room':
                try:
                    client.name = data['user_name']
                    game_room = await create_game_room(data, client)
                except Exception as e:
                    print(f"Error creating game room: {e}")

            elif data['type'] == 'join_game_room':
                try:
                    client.name = data['user_name']
                    game_room = await join_game_room(data, client)
                except Exception as e:
                    print(f"Error joining game room: {e}")

            elif data['type'] == 'get_players':
                try:
                    await get_players(websocket)
                except Exception as e:
                    print(f"Error joining game room: {e}")

            elif data['type'] == 'update_game_room_settings':
                try:
                    await update_game_room_settings(data, game_room)
                except Exception as e:
                    print(f"Error updating game room settings: {e}")

            elif data['type'] == 'get_game_room_settings':
                try:
                    await get_game_room_settings(game_room, websocket)
                except Exception as e:
                    print(f"Error getting game room settings: {e}")

            elif data['type'] == 'get_game_room_settings_and_clients':
                try:
                    await get_game_room_settings_and_clients(game_room, websocket)
                except Exception as e:
                    print(f"Error getting game room settings and clients: {e}")

            elif data['type'] == 'leave_game_room':
                try:
                    await leave_game_room(game_room, client)
                except Exception as e:
                    print(f"Error leaving game room: {e}")

            elif data['type'] == 'start_game':
                try:
                    game_rounds = await prepare_game(game_room)
                    await start_game(game_room, game_rounds, len(game_rounds))
                except Exception as e:
                    print(f"Error starting game: {e}")

            elif data['type'] == 'get_game_room':
                try:
                    await get_game_room(websocket, game_room)
                except Exception as e:
                    print(f"Error getting game room: {e}")

            elif data['type'] == 'send_answer':
                try:
                    await send_answer(game_room, data['answer'], client)
                except Exception as e:
                    print(f"Error sending answer: {e}")
                    
            elif data['type'] == 'get_playlists':
                try:
                    await send_message(websocket, get_playlists_json(access_token=data['access_token']))
                except Exception as e:
                    print(f"Error getting playlists: {e}")

            elif data['type'] == 'get_user_playlists':
                try:
                    await send_message(websocket, get_user_playlists_json(access_token=data['access_token']))
                except Exception as e:
                    print(f"Error getting user playlists: {e}")
                
            elif data['type'] == 'get_user_info':
                try:
                    await send_message(websocket, get_user_info_json(access_token=data['access_token']))
                except Exception as e:
                    print(f"Error getting user info: {e}")

    finally:
        # Remove disconnected client from the given game room
        if game_room is not None and game_room in game_rooms.get_rooms():
            if not game_room.clients:
                game_rooms.remove_room(game_room)
            else:
                game_room.remove_client(client)

async def send_message(websocket, message):
    # check if websocket is still connected
    if websocket.closed:
        return

    # if message is not in json string format convert it to json string
    if type(message) is not str:
        message = json.dumps(message)

    # Send message to a single client
    await websocket.send(message)


async def broadcast_message(game_room, message):
    # Send message to all connected clients in the given game room
    await asyncio.wait([send_message(client.get_websocket(), message) for client in game_room.get_clients()])

def main():
    """
    Main function.
    """
    import websockets
    start_server = websockets.serve(websocket_request_handler, '0.0.0.0', 8765)
    print("Websocket server started on port 8765")

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()


if __name__ == "__main__":
    main()

import asyncio
import json
import random
import string
from game_logic import calculate_score
from shared_rooms import game_rooms
from game_room import GameRoom
from client import Client
from websocket import send_message, broadcast_message

# game_room_settings = {'game_room_id': '1', 'game_room_name': 'qwe', 'game_room_type': 'Guess the Song', 'game_room_visibility': 'private', 'game_room_type': 'guess the song', 'game_room_total_rounds': 10, 'game_room_playlist': '1306931615'}

async def create_game_room(data, client):
    # Get game room settings from message
    game_room_settings = data['game_room_settings']

    # Generate game room ID
    game_room_id = generate_game_room_id()

    # Check if game room ID is unique
    rooms = game_rooms.get_rooms()
    while game_room_id in (room.get_id() for room in rooms):
        game_room_id = generate_game_room_id()
    game_room_settings['game_room_id'] = game_room_id

    # Create new game room
    game_room_name = game_room_settings['game_room_name']
    game_room = GameRoom(
        game_room_id, game_room_name, game_room_settings)
    game_room.add_client(client)
    game_rooms.add_room(game_room)

    # Send game room ID to client
    await send_message(client.websocket, {'status': 'success',
                                          'game_room_id': game_room_id})

    print(f"\nGame room settings: {game_room.get_settings()}")
    print(
        f"Game Room created with gameRoomId: {game_room.get_id()}")

    # Send list of connected clients to all clients in game room
    await send_clients_with_scores(game_room.get_id())

    return game_room


async def join_game_room(data, client):
    game_room = game_rooms.get_room(data['game_room_id'])
    # Add client to the given game room
    if game_room != None:
        # Check if client is already in game room
        oldClient = game_room.get_client_by_name(client.name)
        if oldClient:
            game_room.change_client_websocket(
                oldClient.websocket, client.websocket)
            print(f"####################### CHANGED WEBSOCKET #######################")

        game_room.add_client(client)

        await send_message(client.websocket, {'status': 'success',
                                              'game_room_settings': game_room.get_settings()})
        await send_clients_with_scores(game_room)
        print(
            f"\nWebsocket joined game room with game_room_id: {game_room.id}")

        return game_room

    else:
        await send_message(client.websocket, {'status': 'failure', 'message': 'Invalid game room ID'})
        print(f"\nInvalid game room ID: {game_room}")


async def get_players(game_room):
    # Get list of connected clients
    clients = [client.get_websocket()
               for client in game_room]

    # Create JSON message with list of clients
    message = {'type': 'players', 'players': clients}

    # Send JSON message to all connected clients in game room
    await broadcast_message(game_room, json.dumps(message))


async def update_game_room_settings(data, game_room):
    # Get game_room_settings from message
    game_room_settings = data['game_room_settings']
    # Update game room settings
    print(f"\nGame rooms: {game_rooms.get_rooms()}")
    print(
        f"\nGame room settings: {game_rooms.get_room(game_room_settings['game_room_id'])}")
    game_rooms.get_room(game_room_settings['game_room_id']).set_settings(
        game_room_settings)
    print(
        f"\nGame room settings: {game_rooms.get_room(game_room_settings['game_room_id'])}")
    print(
        f"\nGame Room settings updated with gameRoomId: {game_room.get_id()}")


async def get_game_room_settings(game_room, websocket):
    # Get game room settings from game room
    game_room_settings = game_room.get_settings()
    # Send game room settings to client
    await send_message(websocket, game_room_settings)


async def get_game_room_settings_and_clients(game_room, websocket):
    # Get game room settings from game room
    game_room_settings = game_room.get_settings()
    # Get game room clients
    game_room_clients = game_room.get_clients()
    # Send game room settings to client
    await send_message(websocket, game_room_settings + game_room_clients)


async def get_game_room(websocket, game_room):
    await send_message(websocket, json.dumps({'type': 'game_room',
                                              'game_room': game_room.get_game_room_info()}))


async def send_answer(game_room, answer, client):
    client.score += calculate_score(game_room.current_round, answer)
    await send_message(client.websocket, json.dumps({'type': 'score', 'score': client.get_score()}))


async def leave_game_room(game_room, websocket):
    # Remove client from the given game room
    if game_room is not None and game_room in game_rooms.get_rooms():
        game_room.remove_client_by_websocket(websocket)
        await send_clients(game_room)
        print(
            f"\nWebsocket {websocket} left game room with gameRoomId: {game_room.get_id()}")


def generate_game_room_id(length=8):
    """
    Generate a random game room ID.
    """
    letters = string.ascii_uppercase + string.digits
    return ''.join(random.choice(letters) for i in range(length))


async def send_clients(game_room):
    if isinstance(game_room, str):
        game_room = game_rooms.get_room(game_room)

    clients = [client.get_websocket().remote_address[0]
               for client in game_room.get_clients()]

    message = {'type': 'clients', 'clients': clients}
    broadcast_message(game_room, json.dumps(message))

async def send_clients_with_scores(game_room):
    if isinstance(game_room, str):
        game_room = game_rooms.get_room(game_room)

    clients_scores = game_room.get_clients_scores()
    
    print(f"\nClients: {clients_scores} ###############################")

    message = {'type': 'clients', 'clients_scores': clients_scores}
    print(f"\nMessage: {message} ###############################")
    await broadcast_message(game_room, json.dumps(message))

class GameRoom:
    def __init__(self, game_room_id, game_room_name, game_room_settings):
        self.id = game_room_id
        self.name = game_room_name
        self.playlist_id = game_room_settings['game_room_playlist']
        self.game_type = game_room_settings['game_room_type']
        self.round_duration = game_room_settings['game_room_round_duration']
        self.clients = set()
        self.current_round = None
        self.rounds = []
        self.settings = game_room_settings

    def add_client(self, client):
        self.clients.add(client)

    def remove_client(self, client):
        self.clients.remove(client)

    def remove_client_by_websocket(self, websocket):
        for client in self.clients:
            if client.get_websocket() == websocket:
                self.clients.remove(client)
                return True
        return False

    def get_clients(self):
        return self.clients

    def get_client_by_websocket(self, websocket):
        for client in self.clients:
            if client.get_websocket() == websocket:
                return client
        return None

    def get_client_by_name(self, name):
        for client in self.clients:
            if client.get_name() == name:
                return client
        return None

    def change_client_websocket(self, old_websocket, new_websocket):
        for client in self.clients:
            if client.get_websocket() == old_websocket:
                client.set_websocket(new_websocket)
                return True
        return False
    
    def get_player_names(self):
        return [client.get_name() for client in self.clients]

    def set_current_round(self, round):
        self.current_round = round

    def get_id(self):
        return self.id

    def get_name(self):
        return self.name

    def get_playlist_id(self):
        return self.playlist_id

    def get_game_type(self):
        return self.game_type

    def get_settings(self):
        return self.settings

    def get_scores(self):
        return [client.get_score() for client in self.clients]
    
    def get_clients_scores(self):
        return {client.get_name(): client.get_score() for client in self.clients}

    def get_current_round(self):
        return self.current_round

    def get_game_result(self):
        game_result = {
            'type': 'game_result',
            'clients': [
                    {
                        'name': client.get_name(),
                        'score': client.get_score()
                    }
                for client in self.clients
            ],
            'game_rounds': [round.get_round_info() for round in self.rounds],
            'playlist_id': self.playlist_id,
        }
        print(f'Sending game results: {game_result}')

        return game_result

    def get_game_room_info(self):
        game_room_info = {
            'type': 'game_room',
            'game_room': {
                'id': self.id,
                'name': self.name,
                'playlist_id': self.playlist_id,
                'game_type': self.game_type,
                'clients': list(client.websocket.remote_address[0] for client in self.clients),
                'settings': self.settings
            }
        }
        if self.current_round is not None:
            game_room_info['game_room']['current_round'] = self.current_round.get_round_info(
            )
        return game_room_info

class Client:
    def __init__(self, websocket_client, user_name):
        self.websocket = websocket_client
        self.name = user_name
        self.score = 0

    def get_name(self):
        return self.name
    
    def get_websocket(self):
        return self.websocket

    def set_client_websocket(self, websocket):
        self.websocket = websocket
    
    def get_score(self):
        return int(self.score)
    
    def set_score(self, score):
        self.score = score
class GameRooms:
    def __init__(self):
        self.rooms = set()

    def add_room(self, room):
        self.rooms.add(room)

    def remove_room(self, room):
        self.rooms.remove(room)

    def get_rooms(self):
        return self.rooms
    
    def get_room(self, room_id):
        for room in self.rooms:
            if room.get_id() == room_id:
                return room
        return None
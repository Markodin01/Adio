from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class GameRoom(db.Model):
    __tablename__ = 'game_rooms'

    id = Column(Integer, primary_key=True)
    game_room_id = Column(String(128), unique=True, nullable=False)
    game_room_name = Column(String(128), nullable=False)
    game_room_visibility = Column(String(128), nullable=False)
    game_room_type = Column(String(128), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __init__(self, game_room_id, game_room_name, game_room_visibility, game_room_type):
        self.game_room_id = game_room_id
        self.game_room_name = game_room_name
        self.game_room_visibility = game_room_visibility
        self.game_room_type = game_room_type

    def to_dict(self):
        return {
            'id': self.id,
            'game_room_id': self.game_room_id,
            'game_room_name': self.game_room_name,
            'game_room_visibility': self.game_room_visibility,
            'game_room_game_type': self.game_room_type,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(128), nullable=False)
    email = Column(String(128), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    deezer_token = Column(String(128), unique=True, nullable=False)

    def __init__(self, name, email, deezer_token):
        self.name = name
        self.email = email
        self.deezer_token = deezer_token
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'deezer_token': self.deezer_token
        }


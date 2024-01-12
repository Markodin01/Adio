from .user import User
from .question import Question
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
Base = db.Model

from contextlib import contextmanager
from models import User, db
from sqlalchemy.exc import IntegrityError


class UserService:
    @staticmethod
    def create_user(name, email, deezer_token):
        try:
            user = User(name=name, email=email, deezer_token=deezer_token)
            db.session.add(user)
            db.session.commit()
            return user
        except IntegrityError:
            db.session.rollback()
            raise UserExistsError(f"User with email {email} already exists")

    @staticmethod
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()

    @staticmethod
    def authenticate_user(email):
        user = User.query.filter_by(email=email).first()
        if user:
            return user
        else:
            raise AuthenticationError("Invalid email or password")

    @staticmethod
    def get_user_by_id(user_id):
        return User.query.get(user_id)
    
    @staticmethod
    @contextmanager
    def session_scope():
        session = db.session()
        try:
            yield session
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()


class UserExistsError(Exception):
    pass


class UserDoesNotExistError(Exception):
    pass


class AuthenticationError(Exception):
    pass

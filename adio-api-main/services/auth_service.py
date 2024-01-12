import jwt
from datetime import datetime, timedelta
from flask import current_app

class AuthService:

    @staticmethod
    def encode_auth_token(user_id, deezer_token):
        """
        Generates the Auth Token
        :param user_id: User id
        :param deezer_token: Deezer access token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.utcnow() + timedelta(days=1, seconds=0),
                'iat': datetime.utcnow(),
                'sub': user_id,
                'deezer_token': deezer_token  # add the Deezer token to the payload
            }
            return jwt.encode(
                payload,
                current_app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

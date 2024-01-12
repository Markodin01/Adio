from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from utils.errors import ResourceNotFoundError, UnauthorizedError
from services.user_service import UserService
from services import AuthService


auth_api = Blueprint("auth_api", __name__)
auth_service = AuthService()
user_service = UserService()


class AuthController:

    @staticmethod
    @jwt_required()
    def me():
        current_user_id = get_jwt_identity()
        user = user_service.get_user_by_id(current_user_id)
        if not user:
            raise ResourceNotFoundError("User not found")
        return jsonify(user.to_dict())

    @staticmethod
    def login():
        name = request.get_json().get("name")
        email = request.get_json().get("email")
        deezer_token = request.get_json().get("deezer_token")

        if not name or not email or not deezer_token:
            return jsonify({
                "error_message": "one or more of the fields are empty"
            })

        user = user_service.get_user_by_email(email=email)

        if user:
            access_token = create_access_token(identity=user.id)
            auth_service.encode_auth_token(user_id=user.id, deezer_token=deezer_token)
            return jsonify(access_token=access_token)

        try:
            user = user_service.create_user(name, email, deezer_token)
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token=access_token)
        except ValueError as e:
            return jsonify({
                "error_message": str(e)
            })


auth_api.add_url_rule("/login", "login", AuthController.login, methods=["POST"])
auth_api.add_url_rule("/me", "me", AuthController.me, methods=["GET"])

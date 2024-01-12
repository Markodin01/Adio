from flask import Blueprint, request
from flask_jwt_extended import jwt_required


from utils.errors import BadRequestError, ResourceNotFoundError

user_api = Blueprint("user_api", __name__)


class UserController:
    @staticmethod
    @jwt_required()
    def get_all_users():
        from services.user_service import UserService
        users = UserService.get_all_users()
        return {"data": users}

    @staticmethod
    @jwt_required()
    def get_user_by_id(user_id):
        from services.user_service import UserService
        user = UserService.get_user_by_id(user_id)
        if not user:
            raise ResourceNotFoundError("User not found")
        return {"data": user}

    @staticmethod
    @jwt_required()
    def create_user():
        from services.user_service import UserService
        json_data = request.json
        if not json_data:
            raise BadRequestError("No input data provided")
        user = UserService.create_user(json_data)
        return {"data": user}


user_controller = UserController()


@user_api.route("/users", methods=["GET"])
def get_all_users():
    return user_controller.get_all_users()


@user_api.route("/users/<int:user_id>", methods=["GET"])
def get_user_by_id(user_id):
    return user_controller.get_user_by_id(user_id)


@user_api.route("/users", methods=["POST"])
def create_user():
    return user_controller.create_user()

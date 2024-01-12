from .auth_controller import AuthController
from .questions_controller import QuestionController
from .user_controller import UserController

__all__ = ["AuthController", "QuestionController", "UserController"]

########################################################################################################################
# The controllers module is responsible for handling requests to specific endpoints and returning appropriate responses.
# The controllers in this module serve as an interface between the client and the application's services and models.
#
# Here are the details of each controller in this module:
#
# Auth Controller ##########################################################################################
# The auth_controller handles authentication and authorization requests. It exposes the following endpoints:
#
# POST /auth/register: Registers a new user with the system
# POST /auth/login: Logs in an existing user and returns a JWT token for authorization purposes
#
# User Controller ##########################################################################################
# The user_controller handles requests related to user data. It exposes the following endpoints:
#
# GET /users: Returns a list of all users in the system
# GET /users/<user_id>: Returns user data for the specified user ID
# PUT /users/<user_id>: Updates user data for the specified user ID
# DELETE /users/<user_id>: Deletes the user with the specified user ID
#
# Question Controller ######################################################################################
# The question_controller handles requests related to questions. It exposes the following endpoints:
#
# GET /questions: Returns a list of all questions in the system
# GET /questions/<question_id>: Returns data for the specified question ID
# POST /questions: Creates a new question in the system
# PUT /questions/<question_id>: Updates data for the specified question ID
# DELETE /questions/<question_id>: Deletes the question with the specified question ID


# Each controller interacts with the application's services and models to handle requests and return responses.
# These controllers are registered as Blueprints with the Flask application in the create_app() function in app.py.
# The endpoints exposed by the controllers can be accessed by making requests to the appropriate URLs.
########################################################################################################################
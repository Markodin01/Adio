from .question_service import QuestionService
from .user_service import UserService
from .auth_service import AuthService

########################################################################################################################
# Services Module
# This module contains the implementation of the business logic for the application.
# The services layer is responsible for handling the data from the database and performing operations on it.
# The services layer communicates with the data access layer (DAO) to retrieve data from the database.
#
# UserService #############################################################################################
# The UserService provides the following methods:
#
# register_user
# Registers a new user in the system. The method takes the following parameters:
#
# email: the email address of the user
# username: the username of the user
# password: the password of the user
# This method returns a User object representing the registered user.
#
# login_user
# Authenticates a user in the system. The method takes the following parameters:
#
# email: the email address of the user
# password: the password of the user
# This method returns a JWT token that can be used to authenticate the user in subsequent requests.
#
# get_user_by_id
# Retrieves a user by ID. The method takes the following parameter:
#
# user_id: the ID of the user to retrieve
# This method returns a User object representing the retrieved user.
#
# QuestionService ##################################################################################
# The QuestionService provides the following methods:
#
# create_question
# Creates a new question. The method takes the following parameters:
#
# title: the title of the question
# body: the body of the question
# user_id: the ID of the user who created the question
# This method returns a Question object representing the created question.
#
# get_question_by_id
# Retrieves a question by ID. The method takes the following parameter:
#
# question_id: the ID of the question to retrieve
# This method returns a Question object representing the retrieved question.
#
# get_all_questions
# Retrieves all questions from the database. This method returns a list of Question objects representing
# the retrieved questions.
#
# update_question
# Updates a question. The method takes the following parameters:
#
# question_id: the ID of the question to update
# title: the new title of the question
# body: the new body of the question
# This method returns a Question object representing the updated question.
#
# delete_question
# Deletes a question. The method takes the following parameter:
#
# question_id: the ID of the question to delete
# This method returns None.
########################################################################################################################
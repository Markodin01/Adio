from logging import Manager
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate, upgrade, downgrade

from instance.config import Config

from utils.errors import (
    BadRequestError,
    ForbiddenError,
    ResourceNotFoundError,
    UnauthorizedError,
)
from controllers.questions_controller import questions_api
from controllers.user_controller import user_api
from controllers.auth_controller import auth_api
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
migrate = Migrate()



def create_application():
    application = Flask(__name__)
    CORS(application)
    application.config.from_object(Config)
    db.init_app(application)

    with application.app_context():
        db.create_all()
        migrate = Migrate(application, db, directory='migrations')
        migrate.init_app(application, db)

    jwt = JWTManager(application)

    # update the connection URI here
    application.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI

    @application.route('/')
    def entry_page():
        return jsonify({
            "message": "Flask Works!"
        })

    @application.errorhandler(BadRequestError)
    def handle_bad_request(error):
        return jsonify(error.to_dict()), error.status_code

    @application.errorhandler(UnauthorizedError)
    def handle_unauthorized_error(error):
        return jsonify(error.to_dict()), error.status_code

    @application.errorhandler(ForbiddenError)
    def handle_forbidden_error(error):
        return jsonify(error.to_dict()), error.status_code

    @application.errorhandler(ResourceNotFoundError)
    def handle_resource_not_found_error(error):
        return jsonify(error.to_dict()), error.status_code

    application.register_blueprint(questions_api)
    application.register_blueprint(user_api)
    application.register_blueprint(auth_api)

    application.run(host='0.0.0.0', port=8080)
    
    return application

application = create_application()
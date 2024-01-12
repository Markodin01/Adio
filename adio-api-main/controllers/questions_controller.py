from flask import Blueprint, request, jsonify



class QuestionController:
    @staticmethod
    def index():
        from services.question_service import QuestionService
        question_service = QuestionService
        questions = question_service.get_all_questions()
        return jsonify(questions.to_dict())

    @staticmethod
    def create():
        data = request.get_json()
        from services.question_service import QuestionService
        question_service = QuestionService
        question = question_service.create_question(data)
        return jsonify(question.to_dict())

    @staticmethod
    def show(id):
        from services.question_service import QuestionService
        question_service = QuestionService
        question = question_service.get_question_by_id(id)
        return jsonify(question.to_dict())

    @staticmethod
    def update(id):
        from services.question_service import QuestionService
        data = request.get_json()
        question_service = QuestionService
        question = question_service.update_question(id, data)
        return jsonify(question.to_dict())

    @staticmethod
    def delete(id):
        from services.question_service import QuestionService
        question_service = QuestionService
        question_service.delete_question(id)
        return '', 204

questions_api = Blueprint('questions_api', __name__)
questions_controller = QuestionController()

questions_api.add_url_rule('/questions', 'index', questions_controller.index, methods=['GET'])
questions_api.add_url_rule('/questions', 'create', questions_controller.create, methods=['POST'])
questions_api.add_url_rule('/questions/<int:id>', 'show', questions_controller.show, methods=['GET'])
questions_api.add_url_rule('/questions/<int:id>', 'update', questions_controller.update, methods=['PUT'])
questions_api.add_url_rule('/questions/<int:id>', 'delete', questions_controller.delete, methods=['DELETE'])

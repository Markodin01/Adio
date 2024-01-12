from typing import List

from models import Question
from models import db


class QuestionService:
    @staticmethod
    def create_question(question_data: dict) -> Question:
        question = Question(question_text=question_data['question_text'], answer=question_data['answer'])
        db.session.add(question)
        db.session.commit()
        return question

    @staticmethod
    def get_questions() -> List[Question]:
        return Question.query.all()

    @staticmethod
    def get_question(question_id: int) -> Question:
        return Question.query.filter_by(id=question_id).first()

    @staticmethod
    def delete_question(question: Question):
        db.session.delete(question)
        db.session.commit()

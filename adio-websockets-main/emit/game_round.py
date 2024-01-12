import json


class GameRound():
    """
    EXAMPLE GAME ROUND
    {"type": "new_round", "round_number": 1, "round_track": "{"title": "Little Bit of Love", "artist": "Tom Grennan", "album": "Little Bit of Love", "picture": "https://api.deezer.com/album/193480222/image", "preview": "https://cdns-preview-2.dzcdn.net/stream/c-255e99fa9d87e49d1173c8631bcce1e6-3.mp3", "link": "https://www.deezer.com/track/1178675552", "id": 1178675552}", 
    "round_question": "What's playing?", "round_answers": 
    ["Spit Of You", "Dancing On My Own", "Glimpse of Us", "Little Bit of Love"]}
    """

    def __init__(self, number, question, answers, answer, track):
        self.round_number = number
        self.round_track = track
        self.round_question = question
        self.round_answers = answers
        self.round_answer = answer
        self.round_start_time = None

    def get_round_number(self):
        return self.round_number

    def get_round_track(self):
        return self.round_track

    def get_round_question(self):
        return self.round_question

    def get_round_answer(self):
        return self.round_answer

    def get_round_answers(self):
        return self.round_answers

    def get_round_info(self):
        data = {
            'type': 'new_round',
            'round_number': self.round_number,
            'round_question': self.round_question,
            'round_answers': self.round_answers,
            'round_answer': self.round_answer,
            'round_track': self.round_track.get_track_info(),
        }
        return json.dumps(data)

    def get_round_start_time(self):
        return self.round_start_time

    def set_round_track(self, track):
        self.round_track = track

    def set_round_question(self, question):
        self.round_question = question

    def set_round_answer(self, answer):
        self.round_answer = answer

    def set_round_answers(self, answers):
        self.round_answers = answers

    def set_round_start_time(self, start_time):
        self.round_start_time = start_time

import json


class Track:
    """
    EXAMPLE TRACK
    {"title": "Ghost Rider (2022 - Remaster)", "artist": "Suicide", "album": "Surrender",
    "picture": "https://api.deezer.com/album/290764622/image",
    "preview": "https://cdns-preview-3.dzcdn.net/stream/c-3ef85e2e54f1a3355ec75f1836c93e57-3.mp3",
    "link": "https://www.deezer.com/track/1635225532", "id": 1635225532}
    """

    def __init__(self, title, artist, album, picture, preview, link, id):
        self.title = title
        self.artist = artist
        self.album = album
        self.picture = picture
        self.preview = preview
        self.link = link
        self.id = id

    def get_title(self):
        return self.title

    def get_artist(self):
        return self.artist

    def get_album(self):
        return self.album

    def get_picture(self):
        return self.picture

    def get_preview(self):
        return self.preview

    def get_link(self):
        return self.link

    def get_id(self):
        return self.id

    def get_track_info(self):
        return json.dumps(self.__dict__)

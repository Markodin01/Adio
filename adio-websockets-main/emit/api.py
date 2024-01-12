import json
import deezer

client = deezer.Client(app_id = '583884', app_secret = '08907aff4abc4ba9ced07c726bbbefef')

charts_genres = {
    0: 'All',
    132: 'Pop',
    116: 'Rap/Hip Hop',
    152: 'Rock',
    113: 'Dance',
    165: 'R&B',
    85: 'Alternative',
    106: 'Electro',
    466: 'Folk',
    144: 'Reggae',
    129: 'Jazz',
    84: 'Country',
    98: 'Classical',
    173: 'Films/Games',
    464: 'Metal',
    169: 'Soul & Funk',
    2: 'African Music',
    16: 'Asian Music',
    153: 'Blues',
    75: 'Brazilian Music',
    81: 'Indian Music',
    95: 'Kids',
    197: 'Latin Music',
}

def search_tracks(term: str):
    return client.search(term)

def search_artists(artist: str):
    return client.search_artists(artist)

# TODO: move this to our adio api
def get_playlists_json( access_token: str = None): # genre_id: int = 0,
    playlists = []

    if access_token:
        playlists.extend(get_user_playlists(access_token))

    for genre in charts_genres.keys():
        playlists.extend(client.get_playlists_chart(genre))
            
    playlist_data = []
    for playlist in playlists:
        playlist_data.append({'id': playlist.id, 'title': playlist.title, 'picture': playlist.picture_medium})

    return json.dumps({'type': 'playlists', 'playlists': playlist_data})

def get_user_playlists_json(access_token: str):
    userClient = deezer.Client(access_token=access_token)
    user = userClient.get_user('me')
    playlists = user.get_playlists()

    playlist_data = []
    for playlist in playlists:
        playlist_data.append({'id': playlist.id, 'title': playlist.title, 'picture': playlist.picture_medium})

    return json.dumps({'type': 'playlists', 'playlists': playlist_data})

def get_user_playlists(access_token: str):
    userClient = deezer.Client(access_token=access_token)
    user = userClient.get_user('me')
    playlists = user.get_playlists()

    return playlists

def get_playlist_tracks(playlist_id: str):
    # tracks = client.get_playlist(playlist_id).get_tracks() #TODO: this returns paginated list; might be useful later
    tracks = client.get_playlist(playlist_id).tracks
    track_data = []
    for track in tracks:
        # Check if preview is available
        if track.preview:
            track_data.append({'title': track.title, 'artist': track.artist.name, 'album': track.album.title, 'picture': track.album.cover, 'preview': track.preview, 'link': track.link, 'id': track.id})

    # return json.dumps({'tracks': track_data})
    return track_data

"""
User related functions
"""
def get_user_info_json(access_token: str):
    userClient = deezer.Client(access_token=access_token)
    user = userClient.get_user('me')
    return json.dumps({'type': 'user_info', 'name': user.name,'id': user.id, 'link': user.link, 'picture': user.picture_medium, 'country': user.country})

import deezer

client = deezer.Client()

def search_tracks(term: str):
    return client.search(term)

def search_artists(artist: str):
    return client.search_artists(artist)

def get_playlists(genre_id = 0):
    return client.get_playlists_chart(genre_id)

def get_playlist_tracks(playlist_id: str):
    print("GETTING PLAYLIST TRACKS")
    return client.get_playlist_tracks(playlist_id)

def main():
    """
    Main function.
    """
    playlists = get_playlists()
    print(playlists)

if __name__ == "__main__":
    main()
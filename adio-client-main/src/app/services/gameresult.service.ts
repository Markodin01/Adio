import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameresultService {
//   game_result = {
//     'type': 'game_result',
//     'clients': [
//             {
//                 'name': client.get_name(),
//                 'score': client.get_score()
//             }
//         for client in self.clients
//     ],
//     'game_rounds': [round.get_round_info() for round in self.rounds],
//     'playlist_id': self.playlist_id,
// }
  clients: any[];
  gameRounds: any[];
  playlistId: string;

  constructor() { }

  setGameResult(clients: any[], game_rounds: any[], playlist_id: string) {
    this.clients = clients;
    this.gameRounds = game_rounds;
    this.playlistId = playlist_id;
    // console.log("GAME RESULT IN SETGAMERESULT: ")
    // console.log('CLIENTS: ', this.clients);
    // console.log('GAME ROUNDS: ', this.gameRounds);
    // console.log('PLAYLIST ID: ', this.playlistId);

  }

}

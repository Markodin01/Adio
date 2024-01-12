import { Component } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { GameresultService } from '../services/gameresult.service';
import { RouterService } from '../services/router.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gameresult',
  templateUrl: './gameresult.component.html',
  styleUrls: ['./gameresult.component.scss']
})
export class GameresultComponent {

  players_scores: any[] = [
    // { name: 'Player 1', score: 10 },
    // { name: 'Player 2', score: 15 },
    // { name: 'Player 3', score: 12 },
    // { name: 'Player 4', score: 8 },
    // { name: 'Player 5', score: 9 },
    // { name: 'Player 6', score: 11 },
    // { name: 'Player 7', score: 13 },
    // { name: 'Player 8', score: 14 },
    // { name: 'Player 9', score: 16 },
    // { name: 'Player 10', score: 17 },
    // { name: 'Player 11', score: 18 },
    // { name: 'Player 12', score: 19 },
  ];
  
  roomName: string = "RoomName";
  rounds: any[] = [];
  playlistId: string = '11293677104';

  constructor(private gameresultService: GameresultService, private routerService: RouterService, private sanitizer: DomSanitizer) { 

  }

  ngOnInit(): void {
    // TODO: JUST FOR TESTING
    // if (this.rounds == null) {
      this.players_scores = this.gameresultService.clients;
      this.players_scores.sort((a, b) => b.score - a.score);
      this.rounds = this.gameresultService.gameRounds;
      this.playlistId = this.gameresultService.playlistId;
    // }

  }

  goHome() {
    this.routerService.goHome();
  }

  getSafePlaylistUrl(): SafeResourceUrl {
    const url = `https://www.deezer.com/plugins/player?format=classic&playlist=true&autoplay=false&tracklist=true&color=007FEB&layout=dark&size=medium&type=playlist&id=${this.playlistId}&app_id=583884`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

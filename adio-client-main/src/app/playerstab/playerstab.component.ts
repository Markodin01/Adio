import { Component, Input } from '@angular/core';
import { PlayersService } from '../services/players.service';

@Component({
  selector: 'app-playerstab',
  templateUrl: './playerstab.component.html',
  styleUrls: ['./playerstab.component.scss']
})
export class PlayerstabComponent {
  @Input() players_scores: { [client: string]: number }

  constructor(private playersService: PlayersService) { 
    this.playersService.players_scores$.subscribe((players_scores) => {
      this.players_scores = players_scores;
    });
  }
}

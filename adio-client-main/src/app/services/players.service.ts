import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private players = new BehaviorSubject<string[]>([]);
  players$ = this.players.asObservable();
  private players_scores = new BehaviorSubject<{ [client: string]: number }>({});
  players_scores$ = this.players_scores.asObservable();
  
  private isOwnerSource = new BehaviorSubject<boolean>(sessionStorage.getItem('isOwner') === 'true');
  isOwner$ = this.isOwnerSource.asObservable();
  
  setPlayers(players: string[]): void {
      this.players.next(players);
  }
  
  setPlayersScores(players_scores: { [client: string]: number }): void {
      this.players_scores.next(players_scores);
  }

  setIsOwner(isOwner: boolean): void {
    this.isOwnerSource.next(isOwner);
  }

  constructor() { }
}

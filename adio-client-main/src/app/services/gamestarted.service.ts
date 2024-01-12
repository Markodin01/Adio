import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamestartedService {
  private gameStarted = new BehaviorSubject<boolean>(false);
  gameStarted$ = this.gameStarted.asObservable();

  constructor() {
    this.gameStarted.next(false);
  }

  setGameStarted(gameStarted: boolean): void {
    this.gameStarted.next(gameStarted);
  }
  
}

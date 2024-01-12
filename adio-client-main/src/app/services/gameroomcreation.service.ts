import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, from } from "rxjs";
import { WebSocketService } from "../services/web-socket.service";
import { RouterService } from "./router.service";
import { takeUntil, switchMap } from "rxjs/operators";
import { PlayersService } from "./players.service";
import { DeezerapiService } from "./deezerapi.service";

@Injectable({
  providedIn: "root",
})
export class GameroomcreationService {
  apiUrl: string;
  messages: Subject<string> = new Subject<string>();
  socket: WebSocket;

  private destroy$ = new Subject<void>();

  constructor(
    private webSocketService: WebSocketService,
    private rs: RouterService,
    private playersService: PlayersService,
    private deezerapiService: DeezerapiService,
  ) {
    this.apiUrl = deezerapiService.getDeezerApiUrl();
  }

  private roomSettings = new BehaviorSubject<{
    game_room_id: string;
    game_room_name: string;
    game_room_visibility: string;
    game_room_type: string;
    game_room_total_rounds: number;
    game_room_round_duration: number;
    game_room_playlist: string;
  }>(
    JSON.parse(sessionStorage.getItem("roomSettings") || "{}") || {
      game_room_id: "",
      game_room_name: "",
      game_room_visibility: "",
      game_room_type: "",
      game_room_total_rounds: 0,
      game_room_playlist: "",
    }
  );
  currentRoomSettings = this.roomSettings.asObservable();

  updateRoomSettings(
    roomSettings: Partial<{
      game_room_id: string;
      game_room_name: string;
      game_room_visibility: string;
      game_room_type: string;
      game_room_total_rounds: number;
      game_room_round_duration: number;
      game_room_playlist: string;
    }>
  ): void {
    // Get current value of roomSettings
    const currentValue = this.roomSettings.getValue();
    // Update roomSettings with new values
    const newValue = { ...currentValue, ...roomSettings };
    this.roomSettings.next(newValue);
    sessionStorage.setItem("roomSettings", JSON.stringify(newValue));
  }

  getRoomSettings(): {
    game_room_id: string;
    game_room_name: string;
    game_room_visibility: string;
    game_room_type: string;
    game_room_total_rounds: number;
    game_room_round_duration: number;
    game_room_playlist: string;
  } {
    return this.roomSettings.getValue();
  }

  public async createGameRoom() {
    // console.log('GameRoomCreationService initialized');
    // Clear sessionStorage
    sessionStorage.removeItem('roomSettings');
    sessionStorage.removeItem('isOwner');
  
    this.playersService.setIsOwner(true);
    sessionStorage.setItem('isOwner', JSON.stringify(true));
  
    this.webSocketService.connect();
  
    // Wait for connection to be established before sending message
    this.webSocketService.connectionEstablished
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          // console.log('GameRoomCreationService: connectionEstablished');
          // Get current value of roomSettings
          const roomSettings = this.roomSettings.getValue();
          // Send create_game_room message with roomSettings
          this.webSocketService.send({
            type: 'create_game_room',
            user_name: localStorage.getItem('userName'),
            game_room_settings: roomSettings,
          });
  
          // Subscribe to messages from WebSocketService
          return this.webSocketService.messages;
        })
      )
      .subscribe({
        next: (message) => {
          // Parse message as JSON
          const data = JSON.parse(message);
          if (data.status === 'success' && data.game_room_id != null) {
            this.updateRoomSettings({
              game_room_id: data.game_room_id,
            });
  
            // Get current value of roomSettings
            const roomSettings = this.roomSettings.getValue();
  
            // set roomSettings in sessionStorage
            sessionStorage.setItem('roomSettings', JSON.stringify(roomSettings));
  
            // console.log('Joining room: ' + sessionStorage.getItem('roomSettings'));

            // Navigate to game room
            this.rs.joinGameRoom(roomSettings.game_room_id);

          }
        },
        error: (error) => {
          // Handle error
          console.error('Error in createGameRoom:', error);
        }
      });
  }

ngOnDestroy() {
  // Unsubscribe from observables when component is destroyed
  this.destroy$.next();
  this.destroy$.complete();
}
}

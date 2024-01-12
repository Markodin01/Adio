import { Injectable } from "@angular/core";
import { WebSocketService } from "./web-socket.service";
import { GameroomcreationService } from "./gameroomcreation.service";
import { PlayersService } from "./players.service";
import { RouterService } from "./router.service";

@Injectable({
  providedIn: "root",
})
export class JoingameroomService {
  constructor(
    private webSocketService: WebSocketService,
    private gcs: GameroomcreationService,
    private playersService: PlayersService,
    private routerService: RouterService
  ) {}

  public async joinGameRoom(game_room_id: string) {
    sessionStorage.clear();

    this.playersService.setIsOwner(false);
    sessionStorage.setItem('isOwner', JSON.stringify(false));

    this.webSocketService.connect();

    // Wait for connection to be established before sending message
    this.webSocketService.connectionEstablished.subscribe(() => {
      // console.log("JoingameroomService: connectionEstablished");

      // Send join_game_room message
      this.webSocketService.send({
        type: "join_game_room",
        user_name: localStorage.getItem('userName'),
        game_room_id: game_room_id,
      });

    });

    // Subscribe to messages from WebSocketService
    this.webSocketService.messages.subscribe((message) => {
      // Parse message as JSON
      const data = JSON.parse(message);
      if (data.status == 'success') {
        // Update roomSettings
          this.gcs.updateRoomSettings(data.game_room_settings);
          sessionStorage.setItem('roomSettings', JSON.stringify(data.game_room_settings));
          // console.log("GameroomSettings: " + data.game_room_settings);

          this.routerService.joinGameRoom(game_room_id);
          
        }
      else if (data.status == "failure") {
          // console.log("Invalid code");
      }
    });

  }
}

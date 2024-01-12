import { Component, HostListener, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PlayersService } from "../services/players.service";
import { RouterService } from "../services/router.service";
import { Location } from "@angular/common";
import { InviteService } from "../services/invite.service";
import { JoingameroomService } from "../services/joingameroom.service";
import { WebSocketService } from '../services/web-socket.service';
import { GamestartedService } from "../services/gamestarted.service";

@Component({
  selector: "app-gameready",
  templateUrl: "./gameready.component.html",
  styleUrls: ["./gameready.component.scss"],
})
export class GamereadyComponent {
  @Input() players: string[];
  @Input() isOwner: boolean;
  @Input() gameRoomId: string;

  constructor(
    private playersService: PlayersService,
    private routerService: RouterService,
    private inviteService: InviteService,
    private joingameroomService: JoingameroomService,
    private websocketService: WebSocketService,
    private location: Location,
    private gameStartedService: GamestartedService,
    public dialogRef: MatDialogRef<GamereadyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.playersService.players$.subscribe((players) => {
      this.players = players;
    });
    this.playersService.isOwner$.subscribe((isOwner) => {
      this.isOwner = isOwner;
      sessionStorage.setItem('isOwner', isOwner.toString());
    });
    this.gameRoomId = data.game_room_id;

    this.gameStartedService.gameStarted$.subscribe((gameStarted) => {
      if (gameStarted) {
        this.dialogRef.close();
      }
    });
  }

  ngOnInit(): void {
    // Go to home page if user navigates away from this page
    this.location.subscribe(() => {
      this.routerService.goHome();
    });
  }

  ngOnDestroy() {
  }

  copyGameRoomId(gameRoomId: string): void {
    this.inviteService.copyGameRoomId(gameRoomId);
 }

  //  // Prevent refresh in gameReady
  
  //  @HostListener("window:beforeunload", ["$event"])
  //  canDeactivate(event: Event): boolean {
  //    event.preventDefault();
  //    return false;
  //  }
 
  //  @HostListener('window:keydown', ['$event'])
  //  onKeyDown(event: KeyboardEvent) {
  //    if (event.keyCode === 116) {
  //      event.preventDefault();
  //      event.stopPropagation();
  //    }
  //  }
 
  //  @HostListener('window:keyup', ['$event'])
  //  onKeyUp(event: KeyboardEvent) {
  //    if (event.keyCode === 116) {
  //      event.preventDefault();
  //      event.stopPropagation();
  //    }
  //  }
}

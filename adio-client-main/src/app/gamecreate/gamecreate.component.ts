import { Component, Input } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { GametypeComponent } from "../gametype/gametype.component";
import { GameroomcreationService } from "../services/gameroomcreation.service";
import { RouterService } from "../services/router.service";
import { HttpClient } from "@angular/common/http";
import { PlaylistsComponent } from "../playlists/playlists.component";
import { WebSocketService } from "../services/web-socket.service";
import { PlayersService } from "../services/players.service";
import { NumberpickerComponent } from "../numberpicker/numberpicker.component";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { LoginService } from "../services/login.service";
import { DeezerapiService } from "../services/deezerapi.service";

@Component({
  selector: "app-gamecreate",
  templateUrl: "./gamecreate.component.html",
  styleUrls: ["./gamecreate.component.scss"],
  animations: [
    trigger("fadeInOut", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [
        style({ opacity: 0 }),
        animate("0.5s ease-in-out"),
      ]),
    ]),
  ],
})
export class GamecreateComponent {
  @Input() game_room_name: string;
  @Input() game_room_type: string;
  @Input() game_room_total_rounds: number;
  @Input() game_room_round_duration: number;
  @Input() game_room_playlist_id: string;
  @Input() game_room_playlist_title: string;
  @Input() game_room_visibility: string = "private";

  constructor(
    private dialog: MatDialog,
    private gcs: GameroomcreationService,
    private loginService: LoginService,
    private deezerapiService: DeezerapiService
  ) {}

  // Customise dialogs

  openGameType(): void {
    const dialogRef = this.dialog.open(GametypeComponent, {
      panelClass: "gameTypeDialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.game_room_type = result;
      }
    });
  }

  openTotalRounds(): void {
    const dialogRef = this.dialog.open(NumberpickerComponent, {
      // width: '100vw',
      // maxWidth: '100vh',
      panelClass: "totalRoundsDialog",
      data: { min: 1, max: 100 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.game_room_total_rounds = result;
      }
    });
  }

  openRoundDuration(): void {
    const dialogRef = this.dialog.open(NumberpickerComponent, {
      // width: '100vw',
      // maxWidth: '100vh',
      panelClass: "roundDurationDialog",
      data: { min: 1, max: 30 },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.game_room_round_duration = result;
      }
    });
  }

  openPlaylists(): void {
    const dialogRef = this.dialog.open(PlaylistsComponent, {
      panelClass: "playlistDialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.game_room_playlist_id = result.id;
        this.game_room_playlist_title = result.title;
      }
    });
  }

  public setVisibility() {
    if (this.game_room_visibility == "private") {
      this.game_room_visibility = "public";
    } else {
      this.game_room_visibility = "private";
    }
  }

  createGame() {
    // Update room settings
    this.gcs.updateRoomSettings({
      game_room_name: this.game_room_name,
      game_room_type: this.game_room_type,
      game_room_total_rounds: this.game_room_total_rounds,
      game_room_round_duration: this.game_room_round_duration,
      game_room_playlist: this.game_room_playlist_id,
      game_room_visibility: this.game_room_visibility,
    });

    this.gcs.createGameRoom();
  }

  ngAfterViewInit() {
    if (localStorage.getItem("userName") == null) {
      this.loginService.openChooseUserNameDialog();
    }

    this.deezerapiService.checkTokenExpired();
  }
}

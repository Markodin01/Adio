import { Component, OnDestroy } from "@angular/core";
import { WebSocketService } from "../services/web-socket.service";
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-playlists",
  templateUrl: "./playlists.component.html",
  styleUrls: ["./playlists.component.scss"],
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
export class PlaylistsComponent implements OnDestroy {
  playlists: any[];
  playlistsLoaded = false;
  chosenPlaylistId: string;
  chosenPlaylistTitle: string;

  connectionSubscription: Subscription;
  messagesSubscription: Subscription;

  constructor(
    private webSocketService: WebSocketService,
    private dialogRef: MatDialogRef<PlaylistsComponent>
  ) {}

  ngOnInit() {
    this.webSocketService.connect();

    // Wait for connection to be established before sending message
    this.connectionSubscription =
      this.webSocketService.connectionEstablished.subscribe(() => {
        this.webSocketService.send({
          type: "get_playlists",
          access_token: localStorage.getItem("accessToken"),
        });
      });

    // Subscribe to messages from WebSocketService
    this.messagesSubscription = this.webSocketService.messages.subscribe(
      (message) => {
        // Parse message as JSON
        const data = JSON.parse(message);

        // Update playlists
        if (data.type == "playlists") {
          this.playlists = data.playlists;
          this.playlistsLoaded = true;
        }
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe from observables
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
    }
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  setPlaylist(id: string, title: string) {
    this.chosenPlaylistId = id;
    this.chosenPlaylistTitle = title;
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close({
      id: this.chosenPlaylistId,
      title: this.chosenPlaylistTitle,
    });
  }
}

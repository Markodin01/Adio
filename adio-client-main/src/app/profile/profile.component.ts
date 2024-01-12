import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component } from "@angular/core";
import { LoginService } from "../services/login.service";
import { User } from "src/models/user.model";
import { WebSocketService } from "../services/web-socket.service";
import { Subscription } from "rxjs";
import { RouterService } from "../services/router.service";
import { DeezerapiService } from "../services/deezerapi.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
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
export class ProfileComponent {
  user: User = new User("");
  playlists: any[];
  playlistsLoaded = false;

  connectionSubscription: Subscription;
  messagesSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private webSocketService: WebSocketService,
    private routerService: RouterService,
    private deezerapiService: DeezerapiService
  ) {}

  ngOnInit() {
    this.user.username = localStorage.getItem("userName") as string;
    this.user.id = localStorage.getItem("userId") as string;
    this.user.picture = localStorage.getItem("userPicture") as string;
    this.user.link = localStorage.getItem("userLink") as string;
    this.user.country = localStorage.getItem("userCountry") as string;

    this.webSocketService.connect();

    // Wait for connection to be established before sending message
    this.connectionSubscription =
      this.webSocketService.connectionEstablished.subscribe(() => {
        this.webSocketService.send({
          type: "get_user_playlists",
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

  ngAfterViewInit() {
    this.deezerapiService.checkTokenExpired();
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
}

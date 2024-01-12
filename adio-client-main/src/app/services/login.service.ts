import { Injectable } from "@angular/core";
import { WebSocketService } from "./web-socket.service";
import { Subscription } from "rxjs";
import { ChooseUserNameComponent } from "../choose-user-name/choose-user-name.component";
import { MatDialog } from "@angular/material/dialog";
import { RouterService } from "./router.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  connectionSubscription: Subscription;
  messagesSubscription: Subscription;

  constructor(
    private webSocketService: WebSocketService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {}

  getUserInfo() {
    if (localStorage.getItem("accessToken") == null) {
      return;
    }

    this.webSocketService.connect();

    // Wait for connection to be established before sending message
    this.connectionSubscription =
      this.webSocketService.connectionEstablished.subscribe(() => {
        this.webSocketService.send({
          type: "get_user_info",
          access_token: localStorage.getItem("accessToken"),
        });
      });

    // Subscribe to messages from WebSocketService
    this.messagesSubscription = this.webSocketService.messages.subscribe(
      (message) => {
        // Parse message as JSON
        const data = JSON.parse(message);

        // Update user info
        if (data.type == "user_info") {
          localStorage.setItem("userName", data.name);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("userPicture", data.picture);
          localStorage.setItem("userLink", data.link);
          localStorage.setItem("userCountry", data.country);
        }
      }
    );
  }

  openChooseUserNameDialog() {
    const dialogRef = this.dialog.open(ChooseUserNameComponent, {
      disableClose: true,
      // panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((userName: any) => {
      if (userName) {
        localStorage.setItem("userName", userName);
      }
    });
  }
}

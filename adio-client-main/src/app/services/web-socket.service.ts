import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private websocketUrl = `wss://adio-websockets.uhddbtuebceh6.eu-west-2.cs.amazonlightsail.com`;
  private socket: WebSocket;
  public messages: Subject<string> = new Subject<string>();
  public connectionEstablished: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  public async connect() {
    //TODO: Change to EC2 instance
    this.socket = new WebSocket(this.websocketUrl);
    // this.socket = new WebSocket(`ws://localhost:8765`);
    this.socket.addEventListener("open", () => {
      // console.log("WebSocket connection opened");
      this.connectionEstablished.next(true);
    });
    this.socket.addEventListener("message", (event) => {
      this.messages.next(event.data);
      // console.log(`Received message: ${event.data}`);
    });
  }

  public async send(message: string | object): Promise<void> {
    // Convert message to string if necessary
    if (typeof message !== "string") {
      message = JSON.stringify(message);
    }

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      // console.log("WebSocket connection not open");
      // Wait for connection to open before sending message
      await new Promise((resolve) => {
        const handleOpen = () => {
          this.socket.removeEventListener("open", handleOpen);
          resolve(null);
        };
        this.socket.addEventListener("open", handleOpen);
      });
      this.socket.send(message);
    }
  }
  
  public getConnectionState(): number {
    /*
    0 = CONNECTING
    1 = OPEN
    2 = CLOSING
    3 = CLOSED
    */
    return this.socket.readyState;
  }

  public isSocketInitialised(): boolean {
    return this.socket !== undefined;
  }

  public async close() {
    this.socket.close();
  }
}
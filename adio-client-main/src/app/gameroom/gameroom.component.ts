import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { WebSocketService } from "../services/web-socket.service";
import { MatDialog } from "@angular/material/dialog";
import { GamereadyComponent } from "../gameready/gameready.component";
import { MatButton } from "@angular/material/button";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { PlayersService } from "../services/players.service";
import { RouterService } from "../services/router.service";
import { InviteService } from "../services/invite.service";
import { GamestartedService } from "../services/gamestarted.service";
import { GameRound } from "src/models/game-round.model";
import { Track } from "src/models/track.model";
import { HostListener } from "@angular/core";
import { GameRoom } from "src/models/game-room.model";
import { GameresultService } from "../services/gameresult.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-gameroom",
  templateUrl: "./gameroom.component.html",
  styleUrls: ["./gameroom.component.scss"],
  animations: [
    trigger("fadeInOut", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [
        style({ opacity: 0 }),
        animate("0.5s ease-in-out"),
      ]),
      // transition(':leave', [
      //   animate('0.5s ease-in-out', style({ opacity: 0 })),
      // ]),
    ]),
  ],
  // trigger('chooseButton', [

  // ])
})
export class GameroomComponent {
  @ViewChild("iosAudioClick", { static: true }) iosAudioClick: ElementRef;

  @ViewChild("ans0", { static: true }) ans0: MatButton;
  @ViewChild("ans1", { static: true }) ans1: MatButton;
  @ViewChild("ans2", { static: true }) ans2: MatButton;
  @ViewChild("ans3", { static: true }) ans3: MatButton;

  ansButtons: MatButton[];

  gameRoomSettings = {
    game_room_id: "",
    game_room_name: "",
    game_room_visibility: "",
    game_room_type: "",
    game_room_round_number: 0,
    game_room_round_duration: 0,
    game_room_playlist: "",
  };

  connectionSubscription: Subscription;
  messagesSubscription: Subscription;

  gameStarted: boolean;
  isOwner: boolean;

  // Variables for round time
  ansTime: number;
  revealTime: number = 5;

  // Variables for countdown
  countDownMins: number = 0;
  countDownSecs: number = 0;

  tempScore: number = 0;
  score: number = 0;
  players_scores: { [client: string]: number }

  players: string[] = [];

  isFullScreen = false;

  questions = ["What's playing?"];
  currentQuestion = "";
  currentAnswers: string[] = [];
  answers = [];
  currentAnswer: string;

  gameRoom: GameRoom;
  currentRound: GameRound;
  currentTrack: Track;
  audio = new Audio();

  constructor(
    private renderer: Renderer2,
    private webSocketService: WebSocketService,
    private dialog: MatDialog,
    private playersService: PlayersService,
    private routerService: RouterService,
    private inviteService: InviteService,
    private gameStartedService: GamestartedService,
    private gameresultService: GameresultService
  ) {
    this.audio.volume = 0.5;
    this.audio.muted = true;
    this.audio.autoplay = true;
    // POSSIBLE IOS FIX
    this.audio.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
  }

  ngOnInit() {
    this.isOwner = sessionStorage.getItem("isOwner") == "true";
    this.gameStarted = sessionStorage.getItem("gameStarted") == "true";

    this.ansButtons = [this.ans0, this.ans1, this.ans2, this.ans3];

    // If websocket connection is closed, renew connection
    // console.log("KURWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    // console.log(
    //   "Connection state: " + this.webSocketService.isSocketInitialised()
    // );
    if (this.webSocketService.isSocketInitialised() == false && sessionStorage.getItem("refreshed") == "true") {
      sessionStorage.setItem("refreshed", "false");

      this.webSocketService.connect();

      // Wait for connection to be established before sending message
      this.connectionSubscription =
        this.webSocketService.connectionEstablished.subscribe(() => {
          if (sessionStorage.getItem("roomSettings") != null) {
            const roomSettings = (JSON.parse(sessionStorage.getItem("roomSettings") || ""));
            this.gameRoomSettings.game_room_id = roomSettings.game_room_id;
      
            this.webSocketService.send({
              type: "join_game_room",
              user_name: localStorage.getItem('userName'),
              game_room_id: roomSettings.game_room_id,
            });
          }
        });
    }

    // Subscribe to messages from WebSocketService
    this.webSocketService.messages.subscribe((message: any) => {
      // Parse message as JSON
      const data = JSON.parse(message);

      // Check if message contains list of clients
      if (data.type == "clients") {
        this.setPlayers(Object.keys(data.clients_scores));
        this.setScores(data.clients_scores);
      }

      if (data.type == "game_started") {
        sessionStorage.setItem("gameStarted", "true");
        this.gameStarted = true;
        this.gameStartedService.setGameStarted(true);
      }

      if (data.type == "new_round") {
        this.setRound(data);
        this.startRound();
      }

      if (data.type == "game_room") {
        // console.log(
        //   "################################Game State: " + data.game_room
        // );
      }

      if (data.type == "score") {
        this.tempScore = data.score;
      }

      if (data.type == "round_result") {
        this.currentAnswer = data.answer;
        if (this.tempScore != 0) {
          this.incrementScore(this.tempScore);
          // this.score = this.tempScore;
        }
        this.tempScore = 0;
        this.players_scores = data.clients_scores;

        this.revealAnswer();
      }

      if (data.type == "game_result") {
        this.gameresultService.setGameResult(
          data.clients,
          data.game_rounds,
          data.playlist_id
        );
        this.routerService.navigateToGameResult();
        sessionStorage.setItem("gameFinished", "true");
      }
    });

    this.gameRoomSettings = JSON.parse(
      sessionStorage.getItem("roomSettings") as string
    );
    this.ansTime = this.gameRoomSettings.game_room_round_duration;
  }

  ngAfterViewInit() {
    if (this.gameStarted !== true) {
      this.openGameready();
    }
  }

  ngOnDestroy() {
    this.leaveRoom();
  }

  incrementScore(score: number) {
    if (this.score < this.tempScore) {
      const interval = setInterval(() => {
        this.score++;
        if (this.score === score) {
          clearInterval(interval);
        }
      }, 1);
    }
  }

  private setRound(data: any) {
    this.currentRound = new GameRound(
      data.round_number,
      data.round_question,
      data.round_answers,
      data.round_answer,
      JSON.parse(data.round_track),
    );
    this.currentQuestion = this.currentRound.round_question;
    this.currentAnswers = this.currentRound.round_answers;
    this.currentTrack = this.currentRound.round_track;
  }

  startGame() {
    this.webSocketService.send({
      type: "start_game",
      game_room_id: this.gameRoomSettings.game_room_id,
      game_round_duration: this.gameRoomSettings.game_room_round_duration,
    });
  }

  startRound() {
    this.currentAnswer = "";

    this.playTrack(this.ansTime, this.revealTime);
    this.countDown(this.ansTime);

    this.enableButtons();
    this.revertColors();
  }

  revealAnswer(): void {
    this.disableButtons();
    this.countDown(this.revealTime);

    this.currentQuestion = this.currentTrack.artist + " - " + this.currentTrack.title;
  }

  openGameready(): void {
    // console.log("Passed data: " + this.gameRoomSettings.game_room_id);
    const dialogRef = this.dialog.open(GamereadyComponent, {
      height: "80vh",
      width: "80vw",
      disableClose: true,
      data: {
        game_room_id: this.gameRoomSettings.game_room_id,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (this.isOwner) {
        this.startGame();
      }
    });
  }

  setPlayers(newPlayers: string[]) {
    this.playersService.setPlayers(newPlayers);
  }

  setScores(players_scores: any) {
    this.playersService.setPlayersScores(players_scores);
  }

  isGameFinished(): boolean {
    return sessionStorage.getItem("gameFinished") == "true";
  }

  chooseAnswer(answer: string, ans: MatButton): void {
    this.webSocketService.send({ type: "send_answer", answer: answer });
    // console.log("Sending answer: " + answer);

    this.disableButtons();
    for (const button of this.ansButtons) {
      if (button !== ans) {
        this.renderer.setStyle(
          button._elementRef.nativeElement,
          "opacity",
          "0.5"
        );
      }
    }
    this.renderer.setStyle(
      ans._elementRef.nativeElement,
      "background-color",
      "previous"
    );
  }

  enableButtons() {
    for (const button of this.ansButtons) {
      button.disabled = false;
    }
  }

  disableButtons() {
    for (const button of this.ansButtons) {
      button.disabled = true;
      this.renderer.setStyle(
        button._elementRef.nativeElement,
        "color",
        "black"
      );
    }
  }

  revertColors() {
    for (const button of this.ansButtons) {
      this.renderer.setStyle(button._elementRef.nativeElement, "opacity", "1");
    }
  }

  async leaveRoom(): Promise<void> {
    sessionStorage.removeItem("roomSettings");
    sessionStorage.removeItem("gameStarted");
    sessionStorage.removeItem("isOwner");
    sessionStorage.removeItem("refreshed");
    sessionStorage.removeItem("gameFinished");
    this.routerService.goHome();
    location.reload();
  }

  toggleFullscreen() {
    const elem = document.documentElement;

    if (this.isFullScreen) {
      document.exitFullscreen();
      this.renderer.removeClass(elem, "fullscreen");
    } else {
      elem.requestFullscreen();
      this.renderer.addClass(elem, "fullscreen");
    }

    this.isFullScreen = !this.isFullScreen;
  }

  playTrack(duration: number, fadeOutDuration: number) {
    // Click before play to avoid autoplay restrictions
    this.iosAudioClick.nativeElement.click();
  
    const trackAudio = new Audio();
    trackAudio.src = this.currentTrack.preview;
    trackAudio.volume = 0.5;
    trackAudio.load();
    trackAudio.play();
  
    setTimeout(() => {
      const fadeOutInterval = setInterval(() => {
        if (trackAudio.volume > 0.01) {
          trackAudio.volume -= 0.01;
        } else {
          clearInterval(fadeOutInterval);
          trackAudio.pause();
        }
      }, (fadeOutDuration * 1000) / (trackAudio.volume / 0.01));
    }, (duration) * 1000);
  }

  countDown(duration: number) {
    let counter = duration;
    for (let i = counter; i >= 0; i--) {
      setTimeout(() => {
        this.countDownMins = Math.floor(i / 60);
        this.countDownSecs = i % 60;
      }, 1000 * (counter - i));
    }
  }

  copyGameRoomId(gameRoomId: string): void {
    this.inviteService.copyGameRoomId(gameRoomId);
  }

  // Website utility methods

  // Prevent refresh in gameRoom

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    sessionStorage.setItem('refreshed', 'true');
  }

  // @HostListener("window:beforeunload", ["$event"])
  // canDeactivate(event: Event): boolean {
  //   event.preventDefault();
  //   return false;
  // }

  // @HostListener('window:keydown', ['$event'])
  // onKeyDown(event: KeyboardEvent) {
  //   if (event.keyCode === 116) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  // }

  // @HostListener('window:keyup', ['$event'])
  // onKeyUp(event: KeyboardEvent) {
  //   if (event.keyCode === 116) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  // }
}

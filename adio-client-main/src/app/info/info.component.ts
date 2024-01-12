import { Component } from "@angular/core";
import { ContactComponent } from "../contact/contact.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
})
export class InfoComponent {
  constructor(private dialog: MatDialog) {}

  openInfo(): void {
    this.dialog.open(ContactComponent, {
      panelClass: "contactDialog",
      data: {
        title: this.playCreateTitle,
        info: this.playCreateInfo,
        questions: Object.values(this.playCreateQuestions),
        answers: Object.values(this.playCreateAnswers),
        closure: this.playCreateClosure,
      },
    });
  }

  // TODO: change depending on a page being viewed
  playCreateTitle = `FAQ`;
  playCreateInfo = ``;
  playCreateQuestions = {
    1: `How do I play?`,
    2: `How do I create a game?`,
    3: `How do I access my Deezer playlists?`,
    4: `How do I join a game?`,
    5: `How are the scores counted?`,
  }
  playCreateAnswers = {
    1: `On this page, you can either go on to create a new game or join an existing one. Simply click on the corresponding button to get started.`,
    2: `Navigate to the game creation page through the “create” button. When there, choose all the settings to your liking and once everything is set, click on the “create” button. You will then be redirected to the game page where you can share the game code with your friends.`,
    3: `If you have logged in with your Deezer account, you’ll be able to access your profile from this page and use your own playlists when creating a game. If you have not logged in with Deezer, you can do so by logging out and choosing to log in with Deezer.`,
    4: `Navigate to the game joining page through the “join” button. When there, enter the game code you have received from your friend and click on the “join” button. You will then be redirected to the game page where you can start playing.`,
    5: `The scores are counted according to the time passed after the track began playing. The faster you answer, the more points you get.`,
  }
  playCreateClosure = ``
}

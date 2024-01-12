import { Component, Input } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { GameroomcreationService } from "../services/gameroomcreation.service";
import { JoingameroomService } from "../services/joingameroom.service";
import { PlayersService } from "../services/players.service";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { LoginService } from "../services/login.service";

@Component({
  selector: "app-playgame",
  templateUrl: "./playgame.component.html",
  styleUrls: ["./playgame.component.scss"],
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
export class PlaygameComponent {
  game_room_id: string;

  constructor(
    private formBuilder: FormBuilder,
    private gcs: GameroomcreationService,
    private jgs: JoingameroomService,
    private loginService: LoginService,
  ) {}

  joinForm = this.formBuilder.group({
    game_room_id: ["", [Validators.required, this.gameRoomIdValidator]],
  });

  gameRoomIdValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.length !== 8) {
      return { invalidLength: true };
    }
    return null;
  }

  async joinGame() {
    this.gcs.updateRoomSettings({
      game_room_id: this.joinForm.value.game_room_id as string,
    });
    await this.jgs.joinGameRoom(this.joinForm.value.game_room_id as string);
  }

  ngAfterViewInit() {
    if (localStorage.getItem("userName") === null) {
      this.loginService.openChooseUserNameDialog();
    }
  }
}

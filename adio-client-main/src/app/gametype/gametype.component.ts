import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-gametype',
  templateUrl: './gametype.component.html',
  styleUrls: ['./gametype.component.scss'],
})
export class GametypeComponent {
  @Output() onSelectedGameType = new EventEmitter<any>();

  gameTypes = ["guess the song", "guess the artist", "guess the album"]
  selectedGameType: string;

  constructor(private dialogRef: MatDialogRef<GametypeComponent>) {}

  closeDialog(): void {
    this.dialogRef.close(this.selectedGameType);
  }

  setGameType(gameType: string) {
    this.selectedGameType = gameType;
    this.onSelectedGameType.emit(gameType);
    this.closeDialog()
  }

}

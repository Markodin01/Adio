import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-user-name',
  templateUrl: './choose-user-name.component.html',
  styleUrls: ['./choose-user-name.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChooseUserNameComponent {
  username = '';

  constructor(private dialogRef: MatDialogRef<ChooseUserNameComponent>) {}

  submit() {
    this.dialogRef.close(this.username);
  }
}
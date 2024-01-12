import { Inject } from '@angular/core';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-numberpicker',
  templateUrl: './numberpicker.component.html',
  styleUrls: ['./numberpicker.component.scss']
})
export class NumberpickerComponent {
  @ViewChild('numberPicker') numberPicker: ElementRef;
  @Output() onSelectedNumber = new EventEmitter<any>();

  numbers: number[]; //= Array.from({ length: 100 }, (_, i) => i + 1);
  selectedNumber: number;

  constructor(private dialogRef: MatDialogRef<NumberpickerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.numbers = Array.from(
      { length: this.data.max - this.data.min + 1 },
      (_, i) => i + this.data.min
    );
  }

  ngAfterViewChecked() {
    const buttonHeight = this.numberPicker.nativeElement.querySelector('button').offsetHeight;
    this.numberPicker.nativeElement.scrollTop = buttonHeight * (5 - 1);
  }

  closeDialog(): void {
    this.dialogRef.close(this.selectedNumber);
  }

  setNumber(number: number) {
    this.selectedNumber = number;
    this.onSelectedNumber.emit(number);
    this.closeDialog()
  }
}

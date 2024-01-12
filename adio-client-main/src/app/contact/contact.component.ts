import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent {
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
    }
  
}

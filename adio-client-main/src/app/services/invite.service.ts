import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor() { }

  copyGameRoomId(gameRoomId: string): void {
    // Create a temporary input element to hold the roomId
    const tempInput = document.createElement('input');
    tempInput.value = gameRoomId;
    document.body.appendChild(tempInput);

    // Select the roomId and copy it to the clipboard
    tempInput.select();
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(tempInput);
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router : Router, private route: ActivatedRoute) {}

  joinGameRoom(gameRoomId : string) {
    this.router.navigate(['/gameroom', gameRoomId]);
  }

  goHome() {
    this.router.navigate(['home/play-create'])
  }
  
  navigateToGameResult() {
    const currentUrl = this.router.url;
    const newUrl = `${currentUrl}/game-result`;
    this.router.navigateByUrl(newUrl);
  }

  navigateToLoginPage() {
    this.router.navigate([''])
  }

}

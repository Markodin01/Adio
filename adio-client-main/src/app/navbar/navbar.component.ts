import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  constructor() {}

  checkUserInfoPresent() {
    return (localStorage.getItem('userName') && localStorage.getItem('userPicture') && localStorage.getItem('userLink') && localStorage.getItem('userCountry')) != null;
  }

  logout() {
    localStorage.clear();
  }
}

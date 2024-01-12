import { Injectable } from '@angular/core';
import { RouterService } from './router.service';

@Injectable({
  providedIn: 'root'
})
export class DeezerapiService {
  private apiUrl = 'https://adio-api-aws.uhddbtuebceh6.eu-west-2.cs.amazonlightsail.com/';
  // private adioUrl = 'http://localhost:4200/home/play-create';
  private adioUrl = 'http://adio-client.s3-website.eu-west-2.amazonaws.com/home/play-create'
  private deezerUrl = 'https://connect.deezer.com/oauth/auth.php?app_id=583884&redirect_uri=' + this.adioUrl + '&perms=basic_access,email,manage_library,listening_history&response_type=token';
  private accessToken: string;

  constructor(private routerService: RouterService) { }

  getDeezerUrl() {
    return this.deezerUrl;
  }

  getDeezerToken() {
    return this.accessToken;
  }

  setDeezerToken(token: string, expires: string) {
    // Calculate expiration date
    const date = new Date();
    date.setSeconds(date.getSeconds() + parseInt(expires));
    expires = Math.floor(date.getTime() / 1000).toString();
    localStorage.setItem("expires", expires);
    localStorage.setItem("accessToken", token);
    this.accessToken = token;
}

  getDeezerApiUrl() {
    return this.apiUrl;
  }

  checkTokenExpired() {
    if (parseInt(localStorage.getItem("expires") || '') < Math.floor(Date.now() / 1000)) {
      localStorage.clear();
      this.routerService.navigateToLoginPage(); // TODO: SHOW MESSAGE THAT TOKEN EXPIRED
  }
  }

}

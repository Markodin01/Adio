import { Component, ElementRef, ViewChild } from "@angular/core";
import { LoginService } from "../services/login.service";
import { RouterService } from "../services/router.service";
import { Platform } from "@angular/cdk/platform";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  dotsTop: any[];
  dotsBot: any[];
  isMobile: boolean;

  @ViewChild("joinGame") joinGame!: ElementRef;

  @ViewChild("loginForm") loginForm!: ElementRef;

  constructor(
    private platform: Platform,
    private loginService: LoginService,
  ) {
    this.isMobile = this.platform.ANDROID || this.platform.IOS;

    if (this.isMobile) {
      this.dotsTop = Array(16);
      this.dotsBot = Array(16);
    } else {
      this.dotsTop = Array(36);
      this.dotsBot = Array(36);
    }
  }

  ngAfterViewInit() {
  }

}

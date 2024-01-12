import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DeezerapiService } from "../services/deezerapi.service";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { RouterService } from "../services/router.service";
import { LoginService } from "../services/login.service";
import { Location } from '@angular/common';

@Component({
  selector: "app-playcreate",
  templateUrl: "./playcreate.component.html",
  styleUrls: ["./playcreate.component.scss"],
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
export class PlaycreateComponent {
  constructor(
    private route: ActivatedRoute,
    private deezerapiService: DeezerapiService,
    private routerService: RouterService,
    private loginService: LoginService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      const params = new URLSearchParams(fragment as string);
      if (
        params.has("error_reason") &&
        params.get("error_reason") === "user_denied"
      ) {
        // console.log("User denied access to Deezer");
        this.routerService.navigateToLoginPage();
      } else if (params.has("access_token")) {
        const accessToken = params.get("access_token");
        const expires = params.get("expires");
        this.removeAccessTokenFromUrl();
        this.deezerapiService.setDeezerToken(accessToken as string, expires as string);
        this.loginService.getUserInfo();
      }
    });
  }

  ngAfterViewInit() {
    if (localStorage.getItem("accessToken") === null && localStorage.getItem("userName") === null) {
      this.loginService.openChooseUserNameDialog();
    }

    this.deezerapiService.checkTokenExpired();

  }

  removeAccessTokenFromUrl() {
    // Get the current path without the fragment
    let path = this.location.path(false);
    // Remove the fragment from the path
    path = path.split('#')[0];
    // Replace the current URL with the new path without the fragment
    this.location.replaceState(path);
  }
}

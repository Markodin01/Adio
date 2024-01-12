import {
  Component,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from "@angular/core";
/* ModalDismissReasons for getting info about the action taken */
import {
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";

import { DeezerapiService } from "../services/deezerapi.service";
import { Location } from "@angular/common";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { RouterService } from "../services/router.service";
import { LoginService } from "../services/login.service";
import { timeout } from "rxjs";

@Component({
  selector: "app-loginform",
  templateUrl: "./loginform.component.html",
  styleUrls: ["./loginform.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbModalConfig, NgbModal],
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
export class LoginformComponent {
  @ViewChild("loginModal") loginModal: ElementRef | undefined;

  closeResult: string | undefined;
  deezerUrl: string | undefined;
  // accessToken: string;
  // apiUrl: string;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private deezerapiService: DeezerapiService,
    private location: Location,
    private routerService: RouterService,
    private loginService: LoginService,
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = "static";
    config.keyboard = false;
    config.animation = true;
  }

  ngOnInit() {
    this.deezerUrl = this.deezerapiService.getDeezerUrl();
    this.location.subscribe(() => {
      this.modalService.dismissAll();
    });
  }

  ngAfterViewInit() {

    if (localStorage.getItem("accessToken") !== null || localStorage.getItem("userName") !== null) {
      this.modalService.dismissAll();
      this.routerService.goHome();
    }
    else {
      this.openVerticallyCentered(this.loginModal);
    }
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true, windowClass: 'custom-modal-class' });
  }

}

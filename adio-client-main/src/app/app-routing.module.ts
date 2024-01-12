import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { PlaycreateComponent } from "./playcreate/playcreate.component";
import { LoginformComponent } from "./loginform/loginform.component";
import { GamecreateComponent } from "./gamecreate/gamecreate.component";
import { ProfileComponent } from "./profile/profile.component";
import { MainFrameComponent } from "./main-frame/main-frame.component";
import { PlaygameComponent } from "./playgame/playgame.component";
import { GameroomComponent } from "./gameroom/gameroom.component";
import { GameresultComponent } from "./gameresult/gameresult.component";

const routes: Routes = [
  {
    path: "",
    component: MainFrameComponent,
    children: [{ path: "", component: LoginformComponent }],
  },
  { path: "guest", redirectTo: "home/play-create", pathMatch: "full" },
  { path: "home" , redirectTo: "", pathMatch: "full" },
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "play-create", component: PlaycreateComponent },
      { path: "create-game", component: GamecreateComponent },
      { path: "play-game", component: PlaygameComponent },
      { path: "profile", component: ProfileComponent },
    ],
  },
  {
    path: "gameroom/:gameRoom",
    component: GameroomComponent,
    children: [{ path: "game-result", component: GameresultComponent }],
  },
  {
    path: "**", redirectTo: "", pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

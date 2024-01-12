import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainFrameComponent } from './main-frame/main-frame.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginformComponent } from './loginform/loginform.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { LogoComponent } from './logo/logo.component';
import { PlaycreateComponent } from './playcreate/playcreate.component';
import { GamecreateComponent } from './gamecreate/gamecreate.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { PlaygameComponent } from './playgame/playgame.component';
import { GameroomComponent } from './gameroom/gameroom.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { GametypeComponent } from './gametype/gametype.component';
import { PlayerstabComponent } from './playerstab/playerstab.component';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { GamereadyComponent } from './gameready/gameready.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { NumberpickerComponent } from './numberpicker/numberpicker.component';
import { GameresultComponent } from './gameresult/gameresult.component';
import { ChooseUserNameComponent } from './choose-user-name/choose-user-name.component';
import { InfoComponent } from './info/info.component';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    MainFrameComponent,
    NavbarComponent,
    LoginformComponent,
    HomeComponent,
    LogoComponent,
    PlaycreateComponent,
    GamecreateComponent,
    ProfileComponent,
    ContactComponent,
    PlaygameComponent,
    GameroomComponent,
    GametypeComponent,
    PlayerstabComponent,
    GamereadyComponent,
    PlaylistsComponent,
    NumberpickerComponent,
    GameresultComponent,
    ChooseUserNameComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatRippleModule,
    MatSidenavModule,
    HttpClientModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

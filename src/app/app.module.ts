import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideNavRespComponent } from './side-nav-resp/side-nav-resp.component';
import { TopnavComponent } from './topnav/topnav.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    SideNavRespComponent,
    TopnavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

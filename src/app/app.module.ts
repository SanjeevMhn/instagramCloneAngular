import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideNavRespComponent } from './side-nav-resp/side-nav-resp.component';
import { TopnavComponent } from './topnav/topnav.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostCardComponent } from './post-card/post-card.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { LoginlayoutComponent } from './layouts/loginlayout/loginlayout.component';
import { AddMediaModalComponent } from './add-media-modal/add-media-modal.component';

import { TokenInterceptorInterceptor } from './interceptor/token-interceptor.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    SideNavRespComponent,
    TopnavComponent,
    LoginPageComponent,
    HomePageComponent,
    PostCardComponent,
    UserProfileComponent,
    MainlayoutComponent,
    LoginlayoutComponent,
    AddMediaModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

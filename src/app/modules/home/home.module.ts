import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LayoutComponent } from './shared/layout/layout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SideNavComponent } from 'src/app/side-nav/side-nav.component';
import { TopnavComponent } from 'src/app/topnav/topnav.component';
import { PostCardComponent } from 'src/app/post-card/post-card.component';

import { HomePageComponent } from './home-page/home-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HomePageComponent,
    SideNavComponent,
    TopnavComponent,
    PostCardComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ]
})
export class HomeModule { }

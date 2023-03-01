import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { PostCardComponent } from './post-card/post-card.component';
import { TopnavComponent } from './topnav/topnav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    SideNavComponent,
    PostCardComponent,
    TopnavComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FontAwesomeModule,
  ],
  exports: [
    SideNavComponent,
    PostCardComponent,
    TopnavComponent
  ]
})
export class SharedModule { }

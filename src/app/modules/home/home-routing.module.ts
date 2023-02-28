import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  // { path: '', component: HomePageComponent },
  // { path: 'profile', component: UserProfileComponent }
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      {path: '', component: HomePageComponent},
      {path: 'profile',component: UserProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

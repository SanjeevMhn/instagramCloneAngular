import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
// import { HomePageComponent } from './home-page/home-page.component';
// import { LoginPageComponent } from './login-page/login-page.component';
// import { UserProfileComponent } from './modules/home/user-profile/user-profile.component';
import { HomePageComponent } from './modules/home/home-page/home-page.component';

const routes: Routes = [
  // { path: 'home', component: HomePageComponent, canActivate:[AuthGuard] },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate:[AuthGuard] },
  // { path: 'profile', component: UserProfileComponent, canActivate:[AuthGuard] },
  // { path: 'login', component: LoginPageComponent, canActivate:[LoginGuard]},
  { path: 'login', loadChildren: () => import('./modules/auth/login/login.module').then(m => m.LoginModule), canActivate:[LoginGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

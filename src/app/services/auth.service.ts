import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authCache$?: Observable<any>;
  private loggedInUser = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private router: Router) { }

  login(params: any): Observable<any> {

    return this.http.post('http://127.0.0.1:8000/api/login', params);

  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  setLoggedInUserData(user: any): void {
    this.loggedInUser.next(user);
  }

  getLoggedInUserData(){
    if (this.loggedInUser.getValue() !== null) {
      console.log(this.loggedInUser.getValue());
      return this.loggedInUser.getValue();
    } else {
      if(this.isLoggedIn()){
        this.getAuthUserData()
        .subscribe(
          result => {
            this.setLoggedInUserData(result.user);
            return this.loggedInUser.value;
          },
          error => {
            console.log(error);
          }
        )
      }
    }
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  getAuthUserData():Observable<any> {
    const authUserProfileUrl = 'http://127.0.0.1:8000/api/me';
    return this.http.get(authUserProfileUrl);
  }


  logout() {
    let removeToken = localStorage.removeItem('token');
    this.loggedInUser.next([]);
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }

  // getPostsAuth(): Observable<any> {
  //   const authUserProfileUrl = 'http://127.0.0.1:8000/api/me';
  //   return this.http.get(authUserProfileUrl);


  // }

  // updateGetPostsAuth(): Observable<any> {
  //   const authUserProfileUrl = 'http://127.0.0.1:8000/api/me';
  //   this.authCache$ = this.http.get(authUserProfileUrl).pipe(
  //     shareReplay(1)
  //   )
  //   return this.authCache$;
  // }

  uploadProfilePic(formData: any): Observable<any> {
    // const auth_token = this.getToken();
    const profilePicUploadUrl = 'http://127.0.0.1:8000/api/uploadProfilePic';
    const data: any = {};
    formData.forEach((val: any, key: any) => {
      data[key] = val;
    });

    return this.http.post(profilePicUploadUrl, formData);
  }

}

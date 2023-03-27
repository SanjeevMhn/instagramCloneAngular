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
  constructor(private http: HttpClient, private router: Router) { 
    const savedAuthUser = localStorage.getItem('user');
    if(savedAuthUser){
      this.loggedInUser.next(JSON.parse(savedAuthUser));
    }

  }

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
    localStorage.setItem('user',JSON.stringify(user));
    this.loggedInUser.next(user);
  }

  getLoggedInUserData() {
    
    return this.loggedInUser.getValue();

    // this.getAuthUserData().subscribe(
    //   result => {
    //     this.setLoggedInUserData(result.user);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
   

  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  getAuthUserData(): Observable<any> {
    const authUserProfileUrl = 'http://127.0.0.1:8000/api/me';
    return this.http.get(authUserProfileUrl);
  }


  logout() {
    let removeToken = localStorage.removeItem('token');
    let removeUser = localStorage.removeItem('user');
    let removerPosts = localStorage.removeItem('posts');
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

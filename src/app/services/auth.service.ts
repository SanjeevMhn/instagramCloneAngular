import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router) { }

  login(params:any):Observable<any>{
    
    return this.http.post('http://127.0.0.1:8000/api/login',params);

  }

  isLoggedIn(){
    const token = localStorage.getItem('token');
    if(token){
      return true;
    }else{
      return false;
    }
  }

  getToken(){
    const token = localStorage.getItem('token');
    return token;
  }

  logout(){
    let removeToken = localStorage.removeItem('token');

    if(removeToken == null){
      this.router.navigate(['/login']);
    }
  }

}

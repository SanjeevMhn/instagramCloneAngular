import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const url = "http://127.0.0.1:8000/api";
const baseUrl = `${url}/posts`;
const createPostUrl = `${url}/createPost`;
const userProfileUrl = `${url}/me`;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient,private authService:AuthService) { }

  readAll(): Observable<any> {
    return this.httpClient.get(baseUrl);
  }

  createPost(formData:any) {
    const auth_token = this.authService.getToken();
    
    const data:any = {};
    formData.forEach((val:any,key:any) => {
      data[key] = val;
    });

    console.log(data);
    return this.httpClient.post(createPostUrl,formData);
  }

  getPosts(): Observable<any>{
    return this.httpClient.get(userProfileUrl)
  }

}

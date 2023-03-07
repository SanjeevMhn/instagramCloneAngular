import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const url = "http://127.0.0.1:8000/api";
const baseUrl = `${url}/posts`;
const createPostUrl = `${url}/createPost`;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient,private authService:AuthService) { }

  readAll(page: number, per_page: number): Observable<any> {
    const params = { page: page.toString(), per_page: per_page.toString() };
    return this.httpClient.get(baseUrl, { params });
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


  getPosts(id:any): Observable<any>{
    return this.httpClient.get(`${url}/user/${id}`);
  }

}

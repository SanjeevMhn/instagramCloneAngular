import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const baseUrl = "http://127.0.0.1:8000/api/posts";
const createPostUrl = "http://127.0.0.1:8000/api/createPost";

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
    // let formData = new FormData();
    // formData.append('post_img',image);
    // formData.append('post_desc',desc!);
    // let formDataJson = {
    //   post_img: formData.get('post_img'),
    //   post_desc: formData.get('post_desc'),
    // }

    // let formDataJson = JSON.stringify(formData);
    // console.log(formDataJson);
    const data:any = {};
    formData.forEach((val:any,key:any) => {
      data[key] = val;
    });

    console.log(data);

    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${auth_token}`
    // })
    // return this.httpClient.post(createPostUrl,formData,{headers: headers});
    return this.httpClient.post(createPostUrl,formData);
  }

}

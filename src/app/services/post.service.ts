import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { AuthService } from './auth.service';

const url = "http://127.0.0.1:8000/api";
const baseUrl = `${url}/posts`;
const createPostUrl = `${url}/createPost`;


@Injectable({
  providedIn: 'root'
})



export class PostService {

  // private postCache$?: Observable<any>;
  private postCache = new BehaviorSubject<any[]>([]);
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    const postCachedData = localStorage.getItem('posts');
    if (postCachedData) {
      this.postCache.next(JSON.parse(postCachedData));
    }
  }


  readAll(page: number, per_page: number) {
    // if (!this.postCache) {
    //   const params = { page: page.toString(), per_page: per_page.toString() };
    //   this.postCache =  this.httpClient.get(baseUrl, { params }).pipe(
    //     shareReplay(1)
    //   );
    // }
    // return this.postCache$;
    // const postCachedData = localStorage.getItem('posts');
    if (this.postCache.getValue() !== null) {
      // this.postCache.next(JSON.parse(postCachedData));
      return this.postCache.getValue();
    } else {
      const params = { page: page.toString(), per_page: per_page.toString() }
      this.httpClient.get(baseUrl, { params }).subscribe({
        next: (res: any) => {
          localStorage.setItem('posts', JSON.stringify(res.posts.data));
          console.log(res.posts.data);
          this.postCache.next([...res.posts.data]);
        },
        error: (err) => {
          console.error(err);
        }
      })
    }

    return null;

  }

  addPosts(page: number, per_page: number) {
    const params = {
      page: page.toString(),
      per_page: per_page.toString()
    }

    this.httpClient.get(baseUrl, { params }).subscribe({
      next: (res: any) => {
        this.postCache.next([res.posts.data])
        let oldPosts = localStorage.getItem('posts');
        let newPosts = res.posts.data;
        let parsedOldPosts = JSON.parse(oldPosts || '{}');
        let newPostsArr = [...parsedOldPosts, ...newPosts];
        let newPostCache = localStorage.setItem('posts', JSON.stringify(newPostsArr));
        console.log(newPostsArr);
        this.postCache.next(newPostsArr);
        console.log(this.postCache.getValue());
        return this.postCache.getValue();
      },
      error: (error) => {
        console.error(error)
      }
    })

    return null;
  }

  createPost(formData: any) {
    const auth_token = this.authService.getToken();

    const data: any = {};
    formData.forEach((val: any, key: any) => {
      data[key] = val;
    });

    console.log(data);
    return this.httpClient.post(createPostUrl, formData);
  }


  getPosts(id: any): Observable<any> {
    return this.httpClient.get(`${url}/user/${id}`);
  }

}

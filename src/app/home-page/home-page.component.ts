import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts:any = [];


  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.readPosts();
  }

  readPosts():void{
    this.postService.readAll()
    .subscribe(
      result => {
        this.posts = result.posts ;
        console.log(result.posts)
      },
      error =>{
        console.log(error);
      }
    )
  }

}

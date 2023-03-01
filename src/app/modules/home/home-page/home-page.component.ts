import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../../../services/post.service';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { LayoutComponent } from '../shared/layout/layout.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  // providers: [{ provide: 'Layout', useClass: LayoutComponent }]
})
export class HomePageComponent implements OnInit {

  posts: any = [];
  faClose = faClose;

  constructor(private postService: PostService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.readPosts();
  }

  readPosts(): void {
    this.postService.readAll()
      .subscribe(
        result => {
          this.posts = result.posts;
          // console.log(result.posts)
        },
        error => {
          console.log(error);
        }
      )
  }

}

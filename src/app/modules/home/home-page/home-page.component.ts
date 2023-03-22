import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../../../services/post.service';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { LayoutComponent } from '../shared/layout/layout.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  // providers: [{ provide: 'Layout', useClass: LayoutComponent }]
})
export class HomePageComponent implements OnInit {

  posts: any = [];
  faClose = faClose;
  faAngleDown = faAngleDown;
  perPage = 5;
  currentPage = 1;
  public authUser:any;

  constructor(private postService: PostService,private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.authUser = this.authService.getLoggedInUserData();
    this.readPosts();
  }

  readPosts(): void {
    this.postService.readAll(this.currentPage, this.perPage)
      .subscribe(
        result => {
          this.posts.push(...result.posts.data);
        },
        error => {
          console.log(error);
        }
      )
  }

  nextPage(){
    this.currentPage++;
    this.readPosts();
    console.log(this.currentPage, this.posts);
  }

}

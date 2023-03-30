import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../../../services/post.service';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { LayoutComponent } from '../shared/layout/layout.component';
import { AuthService } from 'src/app/services/auth.service';
import { HomepageService } from 'src/app/services/homepage.service';

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

  constructor(private postService: PostService,private fb: FormBuilder, private authService: AuthService, private homepageService: HomepageService) { }

  ngOnInit(): void {
    this.homepageService.homepageReloadOnNewPostCalled$.subscribe(() => {
      this.reloadForNewPosts();
    })
    this.authUser = this.authService.getLoggedInUserData();
    console.log(this.authUser);
    this.readPosts();
  }

  readPosts(): void {
    this.postService.readAll(this.currentPage, this.perPage).subscribe({
      next: (res) => {
        this.posts = res
      },
      error: (err) => {
        console.error(err);
      }
    });
    console.log(this.posts);
  } 

  nextPage(){
    this.currentPage++;
    this.posts = [];
    this.postService.addPosts(this.currentPage, this.perPage).subscribe({
      next: (res) => {
        this.posts = res
      },
      error: (err) => {
        console.error(err)
      }
    });
    console.log(this.currentPage, this.posts);
  }

  reloadForNewPosts(){
    this.postService.reloadForNewPosts(this.currentPage, this.perPage).subscribe({
      next: (res) => {
        this.posts = res
      },
      error: (err) => {
        console.error(err)
      }
    })

    console.log(this.currentPage, this.posts);
  }

}

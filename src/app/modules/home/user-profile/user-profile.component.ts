import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  // providers: [{provide: 'Layout', useClass: LayoutComponent}]
})
export class UserProfileComponent implements OnInit {

  isLoggedIn: boolean = false;
  posts: any = [];
  userProfilePic: any = null;
  userId: any = null;
  userName: any = null;
  defaultImage = '/assets/images/default_image.png';
  postNumber: number = 0;
  paramUserId: any = null;
  authId: any = null;

  constructor(private postService: PostService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.paramUserId = this.route.snapshot.paramMap.get('id');
    this.getAuthData();
    this.getPosts();
  }

  getAuthData(): void{
    this.authService.getPostsAuth()
      .subscribe(
        result => {
          this.authId = result.data.id;
        },
        error => {
          console.log(error);
        }
      )
  }

  getPosts(): void {
    console.log(this.authId);
    if(this.paramUserId == this.authId){
      this.router.navigate(['/home/feed/profile']);
    }

    if (!this.paramUserId ) {
      this.authService.getPostsAuth()
        .subscribe(
          result => {
            this.userProfilePic = result.data.profile_img;
            this.userName = result.data.name;
            this.userId = result.data.id;
            this.posts = result.uploads;
            this.postNumber = this.posts.length;
          },
          error => {
            console.log(error);
          }
        )
    } else {
      this.postService.getPosts(this.paramUserId)
        .subscribe(
          result => {
            this.userProfilePic = result.user.profile_img;
            this.userName = result.user.name;
            this.userId = result.user.id;
            this.posts = result.posts;
            this.postNumber = this.posts.length;
          },
          error => {
            console.log(error);
          }
        )
    }
  }

}

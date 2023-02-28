import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  // providers: [{provide: 'Layout', useClass: LayoutComponent}]
})
export class UserProfileComponent implements OnInit {

  posts: any = [];
  userProfilePic: any = null;
  userName: any = null;
  defaultImage = '/assets/images/default_image.png';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();

  }

  getPosts(): void{
    this.postService.getPosts()
    .subscribe(
        result => {
          this.userProfilePic = result.data.profile_img;
          this.userName = result.data.name;
          this.posts = result.uploads;
          console.log(this.userProfilePic,this.posts);
        },
        error => {
          console.log(error);
        }
    )
  }

}

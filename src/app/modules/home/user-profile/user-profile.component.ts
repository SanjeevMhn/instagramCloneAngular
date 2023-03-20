import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  // providers: [{provide: 'Layout', useClass: LayoutComponent}]
})
export class UserProfileComponent implements OnInit {

  faClose = faClose;
  isLoggedIn: boolean = false;
  posts: any = [];
  userProfilePic: any = null;
  userId: any = null;
  userName: any = null;
  defaultImage = '/assets/images/default_image.png';
  postNumber: number = 0;
  paramUserId: any = null;
  authId?:Observable<any>;
  showUploadModal = false;
  imageSrc: any = '';
  imgFile: any = null;
  public form!: FormGroup;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.paramUserId = this.route.snapshot.paramMap.get('id');
    // this.getAuthData();
    this.authService.getLoggedInUserData()
    .subscribe(
      (result) => {
        console.log(result.id);
        this.authId = result.id;
      }
    );
    
    this.getPosts();
    this.form = this.fb.group({
      profile_img: [null],
    })
  }

  // getAuthData(): void {
  //   this.authService.getPostsAuth()
  //     .subscribe(
  //       result => {
  //         this.authId = result.data.id;
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     )
  // }

  getPosts(): void {
    console.log(this.authId);
    if (this.paramUserId == this.authId || this.paramUserId == null) {
      this.router.navigate(['/home/feed/profile']);
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

  readUrl(event: Event): void {

    let file = event.target as HTMLInputElement;


    if (file.files && file.files[0]) {
      this.imgFile = file.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(this.imgFile);
    }
  }

  submitForm() {
    console.log(this.imgFile);
    let formData: any = new FormData();
    formData.append('profile_img', this.imgFile, this.imgFile.name)
    this.authService.uploadProfilePic(formData)
      .subscribe({
        next: (res) => {
          // location.reload()
          this.showUploadModal = false;
          this.getPosts();
          // this.readPosts();
        }, error: (err) => {
          console.log(err);
        }
      })

  }

  openModal() {
    if(this.authId == this.paramUserId || this.paramUserId == null){
      this.showUploadModal = true;
    }
  }

  closeModal() {
    this.showUploadModal = false;
  }


}

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
  posts: any = [];
  defaultImage = '/assets/images/default_image.png';
  postNumber: number = 0;
  paramUserId: any = null;
  showUploadModal = false;
  profileImageSrc: any = '';
  profileImgFile: any = null;
  public authUser: any = {};
  public user: any = {};
  public profileForm!: FormGroup;

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
    this.authUser = this.authService.getLoggedInUserData()
    if (this.paramUserId == this.authUser.id || this.paramUserId == null) {
      this.user = this.authUser;
      this.router.navigate(['/home/feed/profile']);
      this.getPosts(this.user.id);
    }else{
      this.getPosts(this.paramUserId);
    }
    this.profileForm = this.fb.group({
      profile_img: [null],
    })
  }
  getPosts(id: any): void {
    this.postService.getPosts(id)
      .subscribe(
        result => {
          this.user = null ?? result.user;
          this.posts = result.posts;
          this.postNumber = this.posts.length;
        },
        error => {
          console.log(error);
        }
      )
  }

  readUrl(event: Event): void {

    let file = event.target as HTMLInputElement;


    if (file.files && file.files[0]) {
      this.profileImgFile = file.files[0];

      const reader = new FileReader();
      reader.onload = e => this.profileImageSrc = reader.result;

      reader.readAsDataURL(this.profileImgFile);
    }
  }

  submitForm() {
    console.log(this.profileImgFile);
    let formData: any = new FormData();
    formData.append('profile_img', this.profileImgFile, this.profileImgFile.name)
    this.authService.uploadProfilePic(formData)
      .subscribe({
        next: (res) => {
          // location.reload()
          this.showUploadModal = false;
          this.getPosts(this.user.id);
          // this.readPosts();
        }, error: (err) => {
          console.log(err);
        }
      })

  }

  openModal() {
    if (this.authUser.id == this.paramUserId || this.paramUserId == null) {
      this.showUploadModal = true;
    }
  }

  closeModal() {
    this.showUploadModal = false;
  }


}

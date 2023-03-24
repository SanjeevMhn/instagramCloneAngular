import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../../../../services/post.service';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  faClose = faClose;
  faAngleDown = faAngleDown;
  showUploadModal = false;
  imageSrc: any = '';
  imgFile: any = null;
  defaultImage = '/assets/images/default_image.png';
  public form!: FormGroup;
  subscription?: Subscription;
  public user: any;


  constructor(private postService: PostService,private fb: FormBuilder,private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      post_img: [null],
      post_desc: [null]
    })

    this.user = this.authService.getLoggedInUserData();

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
    formData.append('post_img', this.imgFile, this.imgFile.name)
    formData.append('post_desc', this.form.get('post_desc')!.value)
    this.postService.createPost(formData)
      .subscribe({
        next: (res) => {
          // location.reload()
          this.showUploadModal = false;
          // this.readPosts();
        }, error: (err) => {
          console.log(err);
        }
      })

  }

  getUploadModalState(evt: any) {
    this.showUploadModal = evt
  }

  closeModal() {
    this.showUploadModal = false;
  }
}

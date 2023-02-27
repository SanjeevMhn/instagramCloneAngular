import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, FormControlName } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-media-modal',
  templateUrl: './add-media-modal.component.html',
  styleUrls: ['./add-media-modal.component.scss']
})
export class AddMediaModalComponent implements OnInit {

  faClose = faClose;
  showUploadModal = false;
  public form!: FormGroup;
  imageSrc: any = '';
  imgFile: any = null;
  posts: any = [];
  defaultImage = '/assets/images/default_image.png';
  onClose = new Subject<void>();

  constructor(private fb: FormBuilder, private postService: PostService) { }

  ngOnInit(): void {
    this.readPosts();
    this.form = this.fb.group({
      post_img: [null],
      post_desc: [null]
    })
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
          location.reload()
          this.readPosts();
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

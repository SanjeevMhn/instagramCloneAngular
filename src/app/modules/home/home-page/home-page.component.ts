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
  showUploadModal = false;
  imageSrc: any = '';
  imgFile: any = null;
  defaultImage = '/assets/images/default_image.png';
  public form!: FormGroup;

  constructor(private postService: PostService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.readPosts();
    // this.form = this.fb.group({
    //   post_img: [null],
    //   post_desc: [null]
    // })
  }

  // readUrl(event: Event): void {
    
  //   let file = event.target as HTMLInputElement;


  //   if (file.files && file.files[0]) {
  //     this.imgFile = file.files[0];

  //     const reader = new FileReader();
  //     reader.onload = e => this.imageSrc = reader.result;

  //     reader.readAsDataURL(this.imgFile);
  //   }
  // }

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

  // submitForm(){
  //   console.log(this.imgFile);
  //   let formData:any = new FormData();
  //   formData.append('post_img',this.imgFile, this.imgFile.name)
  //   formData.append('post_desc',this.form.get('post_desc')!.value)
  //   this.postService.createPost(formData)
  //   .subscribe({
  //     next:(res)=>{
  //       location.reload()
  //       this.readPosts();
  //     },error:(err)=>{
  //       console.log(err);
  //     }
  //   })

  // }

  // getUploadModalState(evt: any) {
  //   this.showUploadModal = evt
  // }

  // closeModal() {
  //   this.showUploadModal = false;
  // }

}

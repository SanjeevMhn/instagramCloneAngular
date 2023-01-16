import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts: any = [];
  faClose = faClose;
  showUploadModal = false;
  imageSrc: any = '';
  defaultImage = '/assets/images/default_image.png';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.readPosts();
  }

  readUrl(event: Event): void {
    
    let file = event.target as HTMLInputElement;

    if (file.files && file.files[0]) {
      const imgFile = file.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(imgFile);
    }
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

  getUploadModalState(evt: any) {
    this.showUploadModal = evt
  }

  closeModal() {
    this.showUploadModal = false;
  }

}

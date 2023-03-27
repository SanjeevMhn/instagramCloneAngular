import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { faBookmark, faComment, faEllipsis,faFaceSmile,faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  faEllipsis = faEllipsis;
  faHeart = faHeart;
  faComment = faComment;
  faPaperPlane = faPaperPlane;
  faBookmark = faBookmark;
  faFaceSmile = faFaceSmile;

  defaultImage = '/assets/images/default_image.png';
  private value?:any;

  @Input() authUser: any;
  @Input() 
  set post(val:any){
    this.value = { ...val };
  }

  get post(){
    return this.value
  }


  constructor() { }

  ngOnInit(): void {
  }

}

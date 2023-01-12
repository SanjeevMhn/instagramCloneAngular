import { Component, OnInit, Input } from '@angular/core';
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

  @Input() post: any;

  constructor() { }

  ngOnInit(): void {
  }

}

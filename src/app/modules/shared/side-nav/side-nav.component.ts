import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { faHome, faMagnifyingGlass, faCompass, faClapperboard, faComment, faHeart, faSquarePlus, faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  // navLinkData = ["faHome","faMagnifyingGlass","faCompass","faClapperboard,faCommet,faHeart"];
  faHome = faHome;
  faMagnifyingGlass = faMagnifyingGlass;
  faCompass = faCompass;
  faClapperboard = faClapperboard;
  faComment = faComment; 
  faHeart = faHeart;
  faSquarePlus = faSquarePlus;
  faBars = faBars;
  faInstagram = faInstagram;
  defaultImg = "/assets/images/default_image.png";

  showOptions = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  @Input() user: any;

  @Input() showUploadModal: any;

  @Output() toggleUploadModal: EventEmitter<any> = new EventEmitter();
  toggleModal(){
    this.toggleUploadModal.emit(this.showUploadModal = !this.showUploadModal);
  }

  logout(){
    this.authService.logout();
  }

  toggleOptions(){
    this.showOptions = !this.showOptions;
  }


}

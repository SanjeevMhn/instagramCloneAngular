import { Component, OnInit } from '@angular/core';
import { faHome, faMagnifyingGlass, faCompass, faClapperboard, faComment, faHeart, faSquarePlus, faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

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


  constructor() { }

  ngOnInit(): void {
  }

}

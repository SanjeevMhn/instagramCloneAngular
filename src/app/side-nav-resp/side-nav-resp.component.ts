import { Component, OnInit } from '@angular/core';
import { faHome, faMagnifyingGlass, faCompass, faClapperboard, faComment, faHeart, faSquarePlus, faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-side-nav-resp',
  templateUrl: './side-nav-resp.component.html',
  styleUrls: ['./side-nav-resp.component.scss']
})
export class SideNavRespComponent implements OnInit {

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

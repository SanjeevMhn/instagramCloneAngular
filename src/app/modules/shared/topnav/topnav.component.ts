import { Component, OnInit } from '@angular/core';
import { faSearch, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  faSearch = faSearch;
  faHeart = faHeart;
  constructor() { }

  ngOnInit(): void {
  }

}

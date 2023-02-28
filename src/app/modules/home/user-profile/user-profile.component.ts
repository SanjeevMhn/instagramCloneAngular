import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../shared/layout/layout.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [{provide: 'Layout', useClass: LayoutComponent}]
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

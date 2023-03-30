import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private homepageReloadOnNewPostSource = new Subject<void>();
  homepageReloadOnNewPostCalled$ = this.homepageReloadOnNewPostSource.asObservable();

  callReloadOnNewPosts(){
    this.homepageReloadOnNewPostSource.next();
  }

  constructor() { }
}

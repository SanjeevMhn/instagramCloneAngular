import { Component, OnInit } from '@angular/core';
// import { KendoInput } from '@progress/kendo-angular-common';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public data: GridDataResult = { data: [], total: 0 };
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.read();
  }

  read(): void {
    this.postService.readAll()
      .subscribe(
        (result) => {
          this.data.data = result.posts;
        },
        error => {
          console.log(error);
        }
      )
  }

}

import {Component, OnInit} from '@angular/core';
import {Post} from "../../add/interfaces";
import {PostService} from "../../add/post.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  posts$: Observable<any> = new Observable<Post[]>()
  search: string = ''

  constructor( private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts()
  }
}

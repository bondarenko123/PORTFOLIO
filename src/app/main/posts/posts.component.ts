import { Component, OnInit } from '@angular/core';
import {PostService} from "../../add/post.service";
import {Post} from "../../add/interfaces";
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  post$!: Observable<Post>

  constructor(private postService: PostService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap( (params) => {
        return this.postService.getOnePost(params['id'])
      })
    )
  }
}

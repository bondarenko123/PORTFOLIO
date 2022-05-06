import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {PostService} from "../../add/post.service";
import {Post} from "../../add/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  getSub!: Subscription
  delSub!: Subscription
  search = ''

  constructor(private postService: PostService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.getSub = this.postService.getPosts().subscribe((resp:any) => {
      this.posts = resp
    })
  }

  remove(id: any) {
    this.delSub = this.postService.removePost(id).subscribe( () => {
      this.posts = this.posts.filter(p => (p.id !== id))
      this.alertService.showAlert('Post successfully removed')
    })
  }

  ngOnDestroy(): void {
    if(this.getSub){
      this.getSub.unsubscribe()
    }
    if(this.delSub){
      this.delSub.unsubscribe()
    }
  }
}

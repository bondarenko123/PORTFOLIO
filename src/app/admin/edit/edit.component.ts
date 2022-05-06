import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../add/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../add/interfaces";
import {Subscription, switchMap} from "rxjs";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  form!: FormGroup
  post: Post | any
  eSub!: Subscription

  constructor( private postService: PostService,
               private route: ActivatedRoute,
               private alertService: AlertService,
               private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap( (params) => {
          return this.postService.getOnePost(params['id'])
        })
      ).subscribe( (post) => {
        this.post = post
          this.form = new FormGroup({
            title: new FormControl(post.title,[Validators.required]),
            text: new FormControl(post.text,[Validators.required])
      })
    })
  }

  submit() {
    this.post = {
      ...this.post,
      title:this.form.value.title,
      text: this.form.value.text,
      date: new Date()
    }
     this.eSub = this.postService.changePost(this.post).subscribe((resp) => {
       this.alertService.showAlert('Post was successfully edited')
     })
  }

  ngOnDestroy(): void {
    if(this.eSub){
      this.eSub.unsubscribe()
    }
  }
}

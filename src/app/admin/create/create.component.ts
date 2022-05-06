import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../add/interfaces";
import {PostService} from "../../add/post.service";
import {Router} from "@angular/router";
import {pipe, Subscription} from "rxjs";
import {AlertService} from "../alert.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy{

  form: FormGroup | any
  cSub!: Subscription

  constructor(private postService: PostService,
              private router: Router,
              private alertService: AlertService
              ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      autor: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required])
    })
  }

  submit() {
    if(this.form.invalid)
      return
    const post: Post = {
      title: this.form.value.title,
      autor: this.form.value.autor,
      text: this.form.value.text,
      date: new Date()
    }
    this.form.reset()
    this.cSub = this.postService.create(post).subscribe((r:Post) => {
      this.alertService.showAlert('Post was successfully created ')
      this.router.navigate(['/admin','dashboard'])
    })
  }

  ngOnDestroy(): void {
    if(this.cSub){
      this.cSub.unsubscribe()
    }
  }


}

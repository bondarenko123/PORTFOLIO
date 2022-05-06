import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../add/interfaces";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup | any
  message: string = ''
  isLogin = false

  constructor(public auth:AuthService,
              private router:Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe( (params) => {
      if(params['timeOfTokenIsTimeOut']){
        this.message = 'Maybe, your authentication is timeout, please log in ! '
      } else if(params['noToken']){
        this.message = 'Please, authenticate!'
      }
    })
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.isLogin = true
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.isLogin = false
      this.router.navigate(['/admin','dashboard'])
    })
  }
}

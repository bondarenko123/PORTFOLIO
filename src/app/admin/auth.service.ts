import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, of, Subject} from "rxjs";
import {Auth, User} from "../add/interfaces";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  err$: Subject<string> = new Subject<string>()

  login(user:User):Observable<User>{
    user.returnSecureToken = true
    return this.http.post<User>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap<any>(this.saveToken),
        catchError<any,any>(this.catchErrors.bind(this))
      )
  }
  saveToken(resp: Auth | null){
    if(resp){
      const timeOfToken = new Date(new Date().getTime() + +resp.expiresIn * 1000)
      localStorage.setItem('idToken', resp.idToken)
      localStorage.setItem('timeToken', timeOfToken.toString())
    } else {
      return localStorage.clear()
    }
  }
  getToken(): any{
    const getTimeOfToken = localStorage.getItem('timeToken')
      if(getTimeOfToken && new Date() > new Date(getTimeOfToken)){
        return this.logout()
        // return null
      } else {
        return localStorage.getItem('idToken')
      }
  }
  // isAuthGuard(){
  //   return !!this.getToken()
  // }
  logout(){
    this.saveToken(null)
  }
  catchErrors(err: HttpErrorResponse){
    switch (err.error.error.message){
      case "EMAIL_NOT_FOUND": this.err$.next('INVALID EMAIL');
      break;
      case "INVALID_PASSWORD": this.err$.next('INVALID PASSWORD');
      break;
    }
  }
}


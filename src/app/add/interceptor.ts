import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../admin/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()

export class Interceptor implements HttpInterceptor{

  constructor(private auth: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.getToken()){
      req = req.clone({
        setParams: {
          auth: this.auth.getToken()
          // auth:'7'
        }
      })
    }
    return next.handle(req)
      .pipe(
        catchError<any, any>( (err: HttpErrorResponse) => {
          if(err.status === 401){
            this.auth.logout()
            this.router.navigate(['/admin','login'], {
              queryParams: {
                noToken: true
              }
            })
          }
        })
      )
  }
}

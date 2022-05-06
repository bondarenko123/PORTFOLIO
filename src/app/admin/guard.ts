import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()

export class Guard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): any {
     if(this.auth.getToken()){
       return true
     } else {
       this.router.navigate(['/admin','login'], {
         queryParams: {
           timeOfTokenIsTimeOut: true
         }
       })
     }

  }
}

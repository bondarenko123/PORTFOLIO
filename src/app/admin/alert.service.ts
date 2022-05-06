import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()

export class AlertService {

  alert$: Subject<string> = new Subject<string>()

  showAlert(text:string){
    this.alert$.next(text)
  }

}

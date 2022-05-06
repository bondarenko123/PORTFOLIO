import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  public text: string = ''
  aSub!: Subscription

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.aSub = this.alertService.alert$.subscribe(  (resp) => {
      this.text = resp
      setTimeout( () => {
        this.text = ''
      },5000)
    })
  }

  ngOnDestroy(): void {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

}

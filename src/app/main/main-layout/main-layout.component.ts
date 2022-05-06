import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    trigger('listOne', [
      state('start', style({height:0, overflow:'hidden'})),
      state('end', style({height:"130px"})),
      transition('start <=> end',animate('0.4s ease-in'))
    ]),
    trigger('listSecond', [
      state('start2', style({height:0, overflow:'hidden'})),
      state('end2', style({height:"90px"})),
      transition('start2 <=> end2',animate('0.4s ease-in'))
    ])
  ]
})
export class MainLayoutComponent {
  appear: string = 'start'
  appear2: string = 'start2'

  constructor() {
  }

  appearListOne() {
    this.appear = this.appear === 'start' ? 'end' : 'start'
  }

  appearListSecond() {
    this.appear2 = this.appear2 === 'start2' ? 'end2' : 'start2'
  }
}

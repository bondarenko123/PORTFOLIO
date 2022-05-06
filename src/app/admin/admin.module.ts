import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../add/shared.module";

import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import {AuthService} from "./auth.service";
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {Guard} from "./guard";
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';
import { AlertComponent } from './alert/alert.component';
import {AlertService} from "./alert.service";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginComponent,
    DashboardComponent,
    CreateComponent,
    EditComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginComponent},
          {path: 'dashboard', component: DashboardComponent, canActivate: [Guard]},
          {path: 'create', component: CreateComponent, canActivate: [Guard]},
          {path: 'post/:id/edit', component: EditComponent, canActivate: [Guard]}
        ]
      }
    ]),
    SharedModule
  ],
  providers:[
    AuthService,
    Guard,
    AlertService
  ],
  exports: [RouterModule]
})
export class AdminModule { }

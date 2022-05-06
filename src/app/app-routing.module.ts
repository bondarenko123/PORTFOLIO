import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {QuillModule} from "ngx-quill";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "./add/shared.module";

import {MainLayoutComponent} from "./main/main-layout/main-layout.component";
import {HomepageComponent} from "./main/homepage/homepage.component";
import {PostsComponent} from "./main/posts/posts.component";
import {EmptypageComponent} from "./main/emptypage/emptypage.component";

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomepageComponent},
      {path: 'posts/:id', component: PostsComponent},
      {path: 'empty', component: EmptypageComponent}
    ]
  },
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(c => c.AdminModule)}
];

@NgModule({
  declarations: [
    MainLayoutComponent,
    HomepageComponent,
    EmptypageComponent,
    PostsComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    QuillModule,
    FormsModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {NgModule} from "@angular/core";
import {QuillModule} from "ngx-quill";
import {HttpClientModule} from "@angular/common/http";
import {SearchPost} from "./search-post";

@NgModule({
  imports: [
    QuillModule.forRoot(),
    HttpClientModule
  ],
  exports: [
    QuillModule,
    SearchPost
  ],
  declarations: [SearchPost]
})

export class SharedModule {}

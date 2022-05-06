import {Pipe,PipeTransform} from "@angular/core";
import {Post} from "./interfaces";

@Pipe({
  name:'searchPost'
})

export class SearchPost implements PipeTransform {
  transform(posts: Post[], search:string): Post[] {
    if(!search.trim()){
      return posts
    }
    return posts.filter(post =>
       post.autor.toLowerCase().includes(search.toLowerCase())
    )
  }
}

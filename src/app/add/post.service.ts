import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post, ResponseFromFB} from "./interfaces";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class  PostService {

  constructor(private http: HttpClient) {
  }

  create(post:Post): Observable<Post>{
    return this.http.post<Post>(`${environment.fbURL}/posts.json`, post)
      .pipe( map<any, any>( (resp:ResponseFromFB) => {
        return {
          ...post,
          id: resp.name,
          date: new Date(post.date)
        }
      }))
  }

  getPosts():Observable<any>{
    return this.http.get<any>(`${environment.fbURL}/posts.json`)
      .pipe( map<any, any>( (resp:any) => {
        return Object.keys(resp)
          .map( key => ({
            ...resp[key],
            id:key
          }))
      }
      ))
  }

  removePost(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.fbURL}/posts/${id}.json`)
  }

  getOnePost(id:string):Observable<any>{
    return this.http.get<Post>(`${environment.fbURL}/posts/${id}.json`)
      .pipe(
        map( (post:Post) => {
          return {
            ...post,
              id,
            date: new Date(post.date)
          }
        })
      )
  }

  changePost(post:Post): Observable<Post>{
    return this.http.patch<Post>(`${environment.fbURL}/posts/${post.id}.json`, post);
  }
}

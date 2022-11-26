import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LikeService {
  private url = 'http://127.0.0.1:5011';

  constructor(private http: HttpClient) {}

  likeAndDislikeState(username: string, blog_id: string) {
    return this.http.get(this.url + '/' + username + '/posts/' + blog_id + '/like');
  }

  addLike(username: string, blog_id: string) {
    return this.http.get(this.url + '/' + username + '/posts/' + blog_id + '/addlike');
  }

  addDislike(username: string, blog_id: string) {
    return this.http.get(this.url + '/' + username + '/posts/' + blog_id + '/adddislike');
  }

  removeLike(username: string, blog_id: string) {
    return this.http.get(this.url + '/' + username + '/posts/' + blog_id + '/removelike');
  }

  removeDislike(username: string, blog_id: string) {
    return this.http.get(this.url + '/' + username + '/posts/' + blog_id + '/removedislike');
  }

//   dislikeState(username: string, blog_id: string) {
//     return this.http.get(this.url + '/' + username + '/posts/' + blog_id + '/dislike');
//   }
}

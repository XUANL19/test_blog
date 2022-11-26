import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentsService {
  private url = 'http://127.0.0.1:5011';

  constructor(private http: HttpClient) {}

  getCommentsByBlogID(owner_id: string, blog_id: string) {
    return this.http.get(this.url + '/' + owner_id + '/posts/' + blog_id + '/getcomments');
  }

  deleteByID(id: any, user_id: string, blog_id: string) {
    return this.http.delete(this.url + '/' + user_id + '/posts/' + blog_id + '/deletecomment', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: id,
      },
    });
  }

  getCommentsNumByBlogID(owner_id: string, blog_id: string) {
    return this.http.get(this.url + '/' + owner_id + '/posts/' + blog_id + '/getcommentsnum');
  }

  aaa() {
    return this.url
  }

}

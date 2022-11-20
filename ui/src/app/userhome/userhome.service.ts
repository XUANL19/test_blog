import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment.model';

@Injectable()
export class UserHomeService {
  private url = 'http://127.0.0.1:5011';

  constructor(private http: HttpClient) {}

  getUserInfo(username: string) {
    return this.http.get(this.url + '/' + username);
  }
}

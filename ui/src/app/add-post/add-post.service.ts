import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable()
export class AddPostService {

  constructor(private http: HttpClient){

  }
  // observable --> http object: header object
  addPost(title: string, description: string, username: string){
    return this.http.post('http://127.0.0.1:5011/' + username + '/addpost',{
      title : title,
      description : description,
    })
  }

}

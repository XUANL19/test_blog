import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment.model';

@Injectable()
export class AddCommentService {

    private url = 'http://127.0.0.1:5011'
 
    constructor(private http: HttpClient){
 
    }
     
    addComment(user_id: string, blog_id: string, content: string){
        return this.http.post(this.url + "/" + user_id + "/posts/" + blog_id + "/addcomment",{
            // blog_id : comment.blog_id,
            content : content
        })
    }

}

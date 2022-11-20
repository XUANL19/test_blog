import { Component } from '@angular/core';
import { AddCommentService } from './add-comment.service';
import { Comment } from '../models/comment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
  providers: [ AddCommentService ]
})
export class AddCommentComponent {

  // public comment : Comment;
  public content = '';

  constructor(private addcommentService: AddCommentService, 
              private router: Router) {
              // this.comment = new Comment();
  }

  addComment() {
    let url = this.router.url
    let blog_id = '';
    let user_id = '';

    if (url.includes('posts/') && this.content) {
      user_id = url.split("/")[1];
      blog_id = url.split("/")[3];
      this.addcommentService.addComment(user_id, blog_id, this.content).subscribe((result: any) => {
        console.log('add comment:', result);}
      );
      alert('conmment added success!')
      window.location.href = user_id + "/posts/" + blog_id;
    } else {
      alert('conmment required')
    }

    // if (this.comment.blog_id && this.comment.content) {
    //   this.commentService.addComment(this.comment).subscribe(result =>{
    //     console.log('result is ', result);

    //   });
    // } else {
    //   alert('blog_id and conmment required')
    // }
  }
}

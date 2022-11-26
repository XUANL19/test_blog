import { Component, Injectable } from '@angular/core';
import { CommentsService } from './comments.service';
import { Comment } from '../models/comment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',                     
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [CommentsService],
})

@Injectable()
export class CommentsComponent {
  public comments: any = [];
  public url = this.router.url;
  public user_id = '';
  public blog_id = '';
  public comment_num = "";
  public test_num = "..";

  constructor(
    private commentsService: CommentsService,
    private router: Router,
   ) {
    // this.test_num
  }

  ngOnInit() {
    this.getComments();
    // this.test_num = "10";
  }

  getComments() {

    if (this.url.includes('posts/')) {
      // url_piece = url.split("/")
      this.user_id = this.url.split("/")[1];
      this.blog_id = this.url.split("/")[3];
      this.commentsService.getCommentsByBlogID(this.user_id, this.blog_id).subscribe((result: any) => {
        this.comments = result;
        console.log('comments: ', result);
    })
      } else {
        alert('wrong url')
      };

      this.commentsService.getCommentsNumByBlogID(this.user_id, this.blog_id).subscribe((res: any) => {
        this.comment_num = res;
        console.log('comment num of this blog: ', this.comment_num);
    })

    
  };

  goToAddCommentPage(pageName:string) {
    // let url = this.router.url;
    this.user_id = this.url.split("/")[1];
    this.blog_id = this.url.split("/")[3];
    // this.router.navigate([`${pageName}`]);
    window.location.href = this.user_id + "/posts/" + this.blog_id + "/addcomment";
  };


  deleteById(_id: any, owner_id: any) {
    // let url = this.router.url;

    if (this.url.includes('posts/')) {
      this.user_id = this.url.split("/")[1];
      this.blog_id = this.url.split("/")[3];
      if (this.user_id === owner_id) {
        this.commentsService.deleteByID(_id, this.user_id, this.blog_id).subscribe((res: any) => {
          console.log(_id + ":delete success " + res);
        });
        alert('conmment delete success!');
      } else {
        alert('You cannot delete comment from others!')
      }
      window.location.href = this.user_id + "/posts/" + this.blog_id;
    }
    // console.log(id)
    // console.log(typeof id)
  }

};

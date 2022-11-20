import { Component } from '@angular/core';
import { SingleBlogService } from './singleblog.service';
import { Comment } from '../models/comment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singleblog',
  templateUrl: './singleblog.component.html',
  styleUrls: ['./singleblog.component.css'],
  providers: [SingleBlogService],
})
export class SingleBlogComponent {
  public blog: any = [];
  public url = this.router.url;
  public user_id = '';
  public blog_id = '';

  constructor(
    private service: SingleBlogService,
    private router: Router) {
  }

  ngOnInit() {
    this.getBlog();
  }

  getBlog() {
    // let url = this.router.url;

    if (this.url.includes('posts/')) {
      // url_piece = url.split("/")
      this.user_id = this.url.split("/")[1];
      this.blog_id = this.url.split("/")[3];
      this.service.getBlogByBlogID(this.user_id, this.blog_id).subscribe((result: any) => {
        this.blog = result;
        console.log('blog info: ', result);
    })
      } else {
        alert('wrong url')
      };
  };

  goToAddPost() {
    this.user_id = this.url.split("/")[1];
    window.location.href = this.user_id + '/addpost'
  }

  goToMyPosts() {
    this.user_id = this.url.split("/")[1];
    window.location.href = this.user_id + '/posts'
  }

  // goToAddCommentPage(pageName:string) {
  //   // let url = this.router.url;
  //   this.user_id = this.url.split("/")[1];
  //   this.blog_id = this.url.split("/")[3];
  //   // this.router.navigate([`${pageName}`]);
  //   window.location.href = this.user_id + "/posts/" + this.blog_id + "/addcomment";
  // };


  // deleteById(_id: any, owner_id: any) {
  //   // let url = this.router.url;

  //   if (this.url.includes('posts/')) {
  //     this.user_id = this.url.split("/")[1];
  //     this.blog_id = this.url.split("/")[3];
  //     if (this.user_id === owner_id) {
  //       this.service.deleteByID(_id, this.user_id, this.blog_id).subscribe((res: any) => {
  //         console.log(_id + ":delete success " + res);
  //       });
  //       alert('conmment delete success!');
  //     } else {
  //       alert('You cannot delete comment from others!')
  //     }
  //     window.location.href = this.user_id + "/posts/" + this.blog_id;
  //   }
  //   // console.log(id)
  //   // console.log(typeof id)
  // }
};

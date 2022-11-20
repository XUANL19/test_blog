import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post } from '../models/post.model';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [ PostService, CommonService ]
})
export class PostComponent implements OnInit {
  public posts : any = [];
  public owner_id = "";
  public url = this.router.url;
  public username = "";

  constructor(private post_service: PostService,
              private common_service: CommonService,
              private router: Router) {

  }

  ngOnInit(){
    this.getPosts();
  };
  

  getPosts(){
    let url = this.router.url;
    this.owner_id = url.split("/")[1];
    this.post_service.getPost(this.owner_id).subscribe((response: any) => {
      console.log('result is ', response);
      this.posts = response;
      
    });
  }

  goToAddPost() {
    this.username = this.url.split("/")[1];
    window.location.href = this.username + '/addpost'
  }

  goToMyPosts() {
    this.username = this.url.split("/")[1];
    window.location.href = this.username + '/posts'
  }

  goToBlogPage(blog_id: any) {
    this.username = this.url.split("/")[1];
    window.location.href = this.username + '/posts/' + blog_id;
  }

}

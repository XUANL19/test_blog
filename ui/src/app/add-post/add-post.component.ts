import { Component } from '@angular/core';
import { AddPostService } from './add-post.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [ AddPostService, CommonService ]
})
export class AddPostComponent {

  // public post : Post;
  public title = "";
  public description = "";
  public url = this.router.url;
  public username = '';

  constructor(private addPostService: AddPostService, private router: Router) {
  }

  addPost() {
    if(this.title && this.description){
      this.username = this.url.split("/")[1]
      this.addPostService.addPost(this.title, this.description, this.username).subscribe((res: any) =>{
        if(res['status'] === 'success') {
          alert('post new blog success!');
          // window.location.href = this.username + '/posts';
          window.location.href = this.username + "/posts";
        } else{
          alert('Unknown error!');
        }
      });
    } else {
      alert('Title and Description required');
    }
  }

}


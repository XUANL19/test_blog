import { Component } from '@angular/core';
import { UserHomeService } from './userhome.service';
import { Comment } from '../models/comment.model';
import { Router } from '@angular/router';

@Component({
    selector: 'userhome',
    templateUrl: './userhome.component.html',
    styleUrls: ['./userhome.component.css'],
    providers: [ UserHomeService ]
  })

export class UserHomeComponent { 

    public userInfo: any = [];
    public url = this.router.url;
    public username = "";
  
    constructor(
      private userhomeservice: UserHomeService,
      private router: Router) { 
  
      }
  
    ngOnInit() {
      this.showUserInfo();
    }
  
    showUserInfo() {
      this.username = this.url.split("/")[1];
      this.userhomeservice.getUserInfo(this.username).subscribe((res: any) => {
        this.userInfo = res;
        console.log("result: ", res)
      })
    }

    goToAddPost() {
      this.username = this.url.split("/")[1];
      window.location.href = this.username + '/addpost'
    }

    goToMyPosts() {
      this.username = this.url.split("/")[1];
      window.location.href = this.username + '/posts'
    }

}
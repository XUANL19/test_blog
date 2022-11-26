import { Component, Injector } from '@angular/core';
import { LikeService } from './like.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css'],
  providers: [ LikeService,
  ],
})

export class LikeComponent {

  constructor(private service: LikeService, 
              private router: Router,
              ) {}

  public likeAndDislikeState: any = [];
  public blog_id = '';
  public user_id = '';
  public url = this.router.url;

  ngOnInit() {
    this.likeAndDislikeCount();
  }

  likeAndDislikeCount() {
    this.user_id = this.url.split("/")[1];
    this.blog_id = this.url.split("/")[3];

    this.service.likeAndDislikeState(this.user_id, this.blog_id).subscribe((result: any) => {
      this.likeAndDislikeState = result;
      console.log('like and dislike result:', result);}
    );
  }

  addLike() {
    console.log(this.user_id, this.blog_id);
    if (this.likeAndDislikeState.likestate === "2") {
      this.service.removeDislike(this.user_id, this.blog_id).subscribe((removedislike: any) => {});
    }
    this.service.addLike(this.user_id, this.blog_id).subscribe((addlike: any) => {});
    window.location.href = this.user_id + "/posts/" + this.blog_id;
  };


  addDislike() {
    console.log(this.user_id, this.blog_id);
    if (this.likeAndDislikeState.likestate === "1") {
      this.service.removeLike(this.user_id, this.blog_id).subscribe((removelike: any) => {});
    }
    this.service.addDislike(this.user_id, this.blog_id).subscribe((adddislike: any) => {});
    window.location.href = this.user_id + "/posts/" + this.blog_id;
  };

}



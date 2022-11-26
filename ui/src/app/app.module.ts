// imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterOutlet } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

// import { AddCommentModule } from './add-comment/add-comment.module';
// import { AddPostModule } from './add-post/add-post.module';
// import { CommentsModule } from './comments/comments.module';
// import { LoginModule } from './login/login.module';
// import { MainModule } from './main/main.module';
// import { PostModule } from './post/post.module';
// import { RegisterModule } from './register/register.module';
// import { SingleBlogModule } from './singleblog/singleblog.module';
// import { UserModule } from './user/user.module';
// import { UserHomeModule } from './userhome/userhome.module';

import { AddCommentComponent } from './add-comment/add-comment.component';
import { AddPostComponent } from './add-post/add-post.component';
import { CommentsComponent } from './comments/comments.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';
import { SingleBlogComponent } from './singleblog/singleblog.component'; 
import { UserComponent } from './user/user.component';
import { UserHomeComponent } from './userhome/userhome.component';
import { LikeComponent } from './like/like.component';
import { AllPostsComponent } from './allposts/allposts.component';


// @NgModule decorator with its metadata

@NgModule({
  declarations: [
    AppComponent,
    AddCommentComponent,
    AddPostComponent,
    CommentsComponent,
    LoginComponent,
    MainComponent,
    PostComponent,
    RegisterComponent,
    SingleBlogComponent,
    // UserComponent,
    UserHomeComponent,
    LikeComponent,
    AllPostsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

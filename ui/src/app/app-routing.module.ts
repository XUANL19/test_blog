import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: "", loadChildren: () => import("./main/main.module").then(module => module.MainModule)},
  {path: "login", loadChildren: () => import("./login/login.module").then(module => module.LoginModule)},
  {path: "users", loadChildren: () => import("./user/user.module").then(module => module.UserModule)},
  {path: "users/:id", loadChildren: () => import("./user/user.module").then(module => module.UserModule)},
  {path: ":id/posts", loadChildren: () => import("./post/post.module").then(module => module.PostModule)},
  {path: ":id/addpost", loadChildren: () => import("./add-post/add-post.module").then(module => module.AddPostModule)},
  {path: "register", loadChildren: () => import("./register/register.module").then(module => module.RegisterModule)},
  {path: ":id/posts/:id", loadChildren: () => import("./singleblog/singleblog.module").then(module => module.SingleBlogModule)},
  {path: ":id/posts/:id/addcomment", loadChildren: () => import("./add-comment/add-comment.module").then(module => module.AddCommentModule)},
  {path: ":id", loadChildren: () => import("./userhome/userhome.module").then(module => module.UserHomeModule)},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


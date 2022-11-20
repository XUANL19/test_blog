import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddCommentComponent } from './add-comment.component';

const routes: Routes = [
  { path: '', component: AddCommentComponent },
  // { path: "posts/:id", loadChildren: () => import("../comments/comments.module").then(module => module.CommentsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes), 
            // RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})
          ],
  exports: [RouterModule],
})
export class AddCommentRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SingleBlogComponent } from './singleblog.component';
import { AddCommentComponent } from '../add-comment/add-comment.component';

const routes: Routes = [
  { path: '', component: SingleBlogComponent },
  // { path: "addcomment", component: AddCommentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes), 
            // RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})
          ],
  exports: [RouterModule],
})
export class SingleBlogRoutingModule {}

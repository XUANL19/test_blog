import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LikeComponent } from './like.component';

const routes: Routes = [
  { path: '', component: LikeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), 
          ],
  exports: [RouterModule],
})
export class LikeRoutingModule {}

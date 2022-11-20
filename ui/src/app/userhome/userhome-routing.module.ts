import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserHomeComponent } from './userhome.component';

const routes: Routes = [
  { path: '', component: UserHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class UserHomeRoutingModule {}
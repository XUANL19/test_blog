import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleBlogComponent } from './singleblog.component';
import { SingleBlogRoutingModule } from './singleblog-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpRequest, HttpXhrBackend } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SingleBlogRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class SingleBlogModule {}

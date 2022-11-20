import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from "./register.component"
import { RegisterRoutingModule } from "./register-routing.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class RegisterModule { }

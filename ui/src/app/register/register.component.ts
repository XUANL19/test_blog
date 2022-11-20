import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import {RegisterService} from "./register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ RegisterService ]
})
export class RegisterComponent {

  public user : User;

  constructor(private service: RegisterService, private router: Router) {
    this.user = new User();
  }

  register() {
    if(this.user.username && this.user.password && this.user.lname && this.user.fname && this.user.email) {
      // TODO: fix deprecated subscribe
      this.service.register(this.user).subscribe((response: any) => {
        console.log('result is ', response);
        if(response['status'] === 'success') {
          alert('Successfully registered!');
          this.router.navigate(['/login']);
        } else if(response['status'] === 'fail_exist'){
          alert('Username or email address already exist!');
        }
        else {
          alert('Unknown error!');
        }
      }, error => {
        console.log('error is ', error);
      });
    } else {
      alert('Please fill up all the boxes!');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormArray,FormsModule } from '@angular/forms';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any = [];
  p: number = 1;
  searchUserForm: FormGroup;

  constructor(private service:UsersService,
              private formsModule: FormsModule,
              private router: Router) {

    this.searchUserForm = new FormGroup({
      username: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] })
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    let username = this.searchUserForm.controls['username'].value;
    let email = this.searchUserForm.controls['email'].value;
    let url = this.router.url;

    // get user by username
    if (url.includes('users/')) {
      this.service.getUserByUsername(url.split('users/')[1]).subscribe((response: any) => {
        this.users = [response];
      });
    }
    else if (url.includes('users?')) {
      // get user by email
      if (url.includes('email')) {
        this.service.getUserByEmail(url.split('email=')[1]).subscribe((response: any) => {
          this.users = response;
        });
      }
    }
    // get all users
    else if (url.includes('users')) {
      this.service.getAllUsers().subscribe((response: any) => {
        this.users = response;
      });
    }
  }

  // search users w/ given information
  searchUser() {
    let username = this.searchUserForm.controls['username'].value;
    var email = this.searchUserForm.controls['email'].value;

    // search by username
    if (username) {
      window.location.href = "/users/" + username;
    } else {
      //search by email only
      if (email) {
        window.location.href = "/users?email=" + email;
      }
    }
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.getUsers();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable()
export class RegisterService {

	constructor(private http: HttpClient){

	}

	register(user: User){
		return this.http.post('http://127.0.0.1:5011/register',{
			username : user.username,
			password : user.password,
      firstName : user.fname,
      lastName : user.lname,
      email : user.email
		})
	}

}

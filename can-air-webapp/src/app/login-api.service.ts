import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { LoginCreds } from './models/LoginCreds';
import { User } from './models/User';
import { Person } from './models/Person';

@Injectable({
  providedIn: 'root'
})
export class LoginAPIService {

  baseUrl: string = 'http://Canair-env.eba-jmrq7r5v.us-east-2.elasticbeanstalk.com/users'
  constructor(private http: HttpClient) { }

  //post request to /users returns person object
  authenticateUser(loginCreds: LoginCreds){
    
    return this.http.post(this.baseUrl, loginCreds);
  }

  getUserByPersonId(person: Person){
    return this.http.get(`${this.baseUrl}?pId=${person.personId}`)
  }
  
}

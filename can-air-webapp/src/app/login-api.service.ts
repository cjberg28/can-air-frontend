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

  baseUrl: string = 'localhost:8080'
  constructor(private http: HttpClient) { }

  //post request to /users returns person object
  authenticateUser(loginCreds: LoginCreds){
    return this.http.post(`${this.baseUrl}/users`, loginCreds);
  }

  getPersonByUserId(user: User): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${user.userId}`)
  }

  getPersonByPersonId(person: Person): Observable<any> {
    return this.http.get(`${this.baseUrl}/users?pId=${person.personId}`)
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/User';
import { LoginCreds} from './models/LoginCreds'
import { Person } from './models/Person';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  baseUrl = 'http://Canair-env.eba-jmrq7r5v.us-east-2.elasticbeanstalk.com/users'
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl)
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  saveUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  //pass in Person object to users endpoint thru a put request
  updateUser(authPerson: Person) {
    return this.http.put(this.baseUrl, authPerson);
  }

  

  deleteUser(user: User) {
    return this.http.delete(`${this.baseUrl}/${user.userId}`)
  }
}

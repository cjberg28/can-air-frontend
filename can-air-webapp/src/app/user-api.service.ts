import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/User';
import { LoginCreds} from './models/LoginCreds'

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  baseUrl = 'localhost:8080/users'
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

  updateUser(user: User) {
    return this.http.put(this.baseUrl, user);
  }

  deleteUser(user: User) {
    return this.http.delete(`${this.baseUrl}/${user.userId}`)
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAPIService {

  baseUrl: string = 'localhost:8080/can-air/users/'
  constructor(private http: HttpClient) { }

  // getUser(username: string, password: string): Observable<any>{
  //   return this.http.get(this.baseUrl )
  // }
}

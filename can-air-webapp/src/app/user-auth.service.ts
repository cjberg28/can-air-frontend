import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from './models/Person';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private defaultPerson = new BehaviorSubject<Person>(new Person());
  
  authorizedPerson = this.defaultPerson.asObservable();
  constructor() { }

  getAuthorizedPerson(authPerson: Person) {
    this.defaultPerson.next(authPerson)
    
  }
}

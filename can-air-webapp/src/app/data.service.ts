import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Flight } from './models/Flight';
import { LoginCreds } from './models/LoginCreds';
import { Person } from './models/Person';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private defaultFlight = new BehaviorSubject<Flight>(new Flight());
  private defaultPerson = new BehaviorSubject<Person>(new Person());

  
  currentFlight = this.defaultFlight.asObservable();
  authorizedPerson = this.defaultPerson.asObservable();
  constructor() { }

  //gets the current flight that is shared between components
  getFlightFromHome(flightFromHome: Flight){
    this.defaultFlight.next(flightFromHome)
  }

  //gets person object from login creds
  getAuthorizedPerson(authPerson: Person) {
    this.defaultPerson.next(authPerson)
  }
}

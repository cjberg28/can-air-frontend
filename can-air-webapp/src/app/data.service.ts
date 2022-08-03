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
    
  currentFlight = this.defaultFlight.asObservable();
  

  
  constructor() { }

  //gets the current flight that is shared between components
  getFlightFromHome(flightFromHome: Flight){
    this.defaultFlight.next(flightFromHome)
    
  }

}

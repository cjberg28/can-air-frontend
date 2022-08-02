import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Flight } from './models/Flight';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private defaultFlight = new BehaviorSubject<Flight>(new Flight());
  currentFlight = this.defaultFlight.asObservable();
  constructor() { }

  getFlightFromHome(flightFromHome: Flight){
    this.defaultFlight.next(flightFromHome)
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from './models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class CurrentReservationDetailsService {

  private defaultReservation = new BehaviorSubject<Reservation>(new Reservation());
 
  currentReservation = this.defaultReservation.asObservable();

  constructor() { }

  getCurrentReservation(reservation: Reservation){
    this.defaultReservation.next(reservation)
    
  }

}

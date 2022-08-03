import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Reservation } from './models/Reservation';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class ReservationApiService {

  baseUrl: string = 'localhost:8080/reservations'
  constructor(private http: HttpClient) { }

  getAllReservations(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getAllReservationsForUser(user: User): Observable<any> {
    let url: string = `${this.baseUrl}?userId=${user.userId}`
    return this.http.get(url);
  }

  

  saveReservation(reservation: Reservation){
    return this.http.post(this.baseUrl, reservation).pipe(catchError(this.handleError))
  }

  updateReservation(reservation: Reservation){
    return this.http.put(this.baseUrl, reservation).pipe(catchError(this.handleError))
  }

  deleteReservation(reservation: Reservation){
    return this.http.delete(`${this.baseUrl}/${reservation.reservationId}`).pipe(catchError(this.handleError))
  }

  private handleError(error :HttpErrorResponse){
    console.log(error);
    return throwError(() => {
      throw new Error();
    });
  }

}



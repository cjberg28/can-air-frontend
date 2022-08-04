import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Reservation } from './models/Reservation';
import { SmallReservation } from './models/SmallReservation';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class ReservationApiService {

  baseUrl: string = 'http://localhost:8080/reservations'
  constructor(private http: HttpClient) { }

  getAllReservations(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getAllReservationsForUser(user: User): Observable<any> {
    let url: string = `${this.baseUrl}?userId=${user.userId}`
    return this.http.get(url);
  }

  getBigReservationDetails(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?userId=${userId}`);
  }

  saveReservation(reservation: SmallReservation){
    return this.http.post(this.baseUrl, reservation).pipe(catchError(this.handleError))
  }

  updateReservation(reservation: SmallReservation){
    return this.http.put(this.baseUrl, reservation).pipe(catchError(this.handleError))
  }

  deleteReservation(reservationId: number){
    console.log(`${this.baseUrl}/${reservationId}`)
    return this.http.delete(`${this.baseUrl}/${reservationId}`).pipe(catchError(this.handleError))
  }

  private handleError(error :HttpErrorResponse){
    console.log(error);
    return throwError(() => {
      throw new Error();
    });
  }

}



import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Flight } from './models/Flight';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightApiService {

  
  baseUrl: string = "http://localhost:8080/flights"
  airportMap: Map<string, number> = new Map<string, number>([
    ["MSP", 1],
    ["LAX", 2],
    ["DTW", 3],
    ["YYZ", 4],
    ["PHL", 5],
    ["ORD", 6],
    ["LHR", 7]
  ]);

  constructor(private http: HttpClient) {
   
  }

  getAll(): Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getFlightsMatchingCriteria(flightFormData: Flight): Observable<any>{
    let departId = this.airportMap.get(flightFormData.departureLocation.substring(0, 3));
    let arriveId = this.airportMap.get(flightFormData.arrivalLocation.substring(0, 3));
    console.log(flightFormData);
    console.log(departId, arriveId)
    let url: string = this.baseUrl + `?departing=${departId}&arriving=${arriveId}&depDate=${flightFormData.departureDate}&roundTrip=${flightFormData.roundTrip}&retDate=${flightFormData.returnDate}`;

    return this.http.get(url);
  }


}

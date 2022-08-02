import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Flight } from './models/Flight';
import { catchError, Observable, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

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

  constructor(private http: HttpClient, private datepipe: DatePipe) {
   
  }

  getAll(): Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getFlightsMatchingCriteria(flightFormData: Flight): Observable<any>{
    let departId = this.airportMap.get(flightFormData.departureLocation.substring(0, 3));
    let arriveId = this.airportMap.get(flightFormData.arrivalLocation.substring(0, 3));
    let depDate:string = this.datepipe.transform(flightFormData.departureDate, 'yyyy-MM-dd') + '';
    
    // let retDateDefault = this.datepipe.transform((new Flight()).returnDate, 'yyyy-MM-dd')
    let retDate:string = this.datepipe.transform(flightFormData.departureDate, 'yyyy-MM-dd') + '';
    let url: string;
    // console.log(departId, arriveId)
    console.log(depDate , retDate)
    if(flightFormData.roundTrip == false){
      url = this.baseUrl + `/search?departing=${departId}&arriving=${arriveId}&depDate=${depDate}&roundTrip=${flightFormData.roundTrip}`
    }
    else {
      url = this.baseUrl + `/search?departing=${departId}&arriving=${arriveId}&depDate=${depDate}&roundTrip=${flightFormData.roundTrip}&retDate=${retDate}`;
    }
    console.log(url)
    
    return this.http.get(url);
  }


}

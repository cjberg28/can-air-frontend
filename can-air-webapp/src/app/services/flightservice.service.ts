import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchresultspageComponent } from '../searchresultspage/searchresultspage.component';

@Injectable({
  providedIn: 'root'
})
export class FlightserviceService {

  http: HttpClient

  constructor(http :HttpClient) {
    this.http = http;
  }

  url="http://localhost:8080/can-air/flights";

  getAllFlights() :Observable<any> {
    return this.http.get(this.url);
  }

  searchByParameter(parameters :Map<string, object>){
    return this.http.get(this.url + parameters);
  }
}

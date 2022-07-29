import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from '../models/Flight';
import { FlightApiService } from '../flight-api.service';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // departing?: string;
  // arriving?: string;
  // departureDate?: Date;
  // isRoundTrip?: boolean;
  // returnDate?: Date;
  airports: string[] = [];
  isProgressSpinnerActivated: boolean = false;
  flightFormData: Flight = new Flight();
  

  //to parse names and ids... not sure what to do with this though
  airportMap: Map<string, number> = new Map<string, number>([
    ["MSP", 1],
    ["LAX", 2],
    ["DTW", 3],
    ["YYZ", 4],
    ["PHL", 5],
    ["ORD", 6],
    ["LHR", 7]
  ]);

  searchParameters: Map<string, object> = new Map<string, object>([
    
  ]);

  constructor(private router: Router, private service: FlightApiService) {
    
   }

  ngOnInit(): void {
    this.airports = [
      'MSP - Minneapolis/St. Paul',
      'LAX - Los Angeles',
      'DTW - Detroit',
      'YYZ - Toronto',
      'PHL - Philadelphia',
      'ORD - Chicago',
      'LHR - London'
    ]
  }

  searchFlights() {
    this.isProgressSpinnerActivated = true;
    setTimeout(() => {this.router.navigate(['flights']);}, 2000);
    console.log(this.flightFormData);
  }

  

}

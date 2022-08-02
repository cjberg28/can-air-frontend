import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { HomepageComponent } from '../homepage/homepage.component';
import { Airports } from '../models/Airports';
import { Flight } from '../models/Flight';


@Component({
  selector: 'app-reserveflightpage',
  templateUrl: './reserveflightpage.component.html',
  styleUrls: ['./reserveflightpage.component.css']
})
export class ReserveflightpageComponent implements OnInit {

  flightsFromHome: Array<Flight> = [];
  flightFormDataFromHome!: Flight;
  cardNumber: number = 0;

  subscription!: Subscription;

  airportMapFlipped: Map<number, string> = new Map<number, string>([
    [1, "MSP - Minneapolis/St. Paul"],
    [2, "LAX - Los Angeles"],
    [3, "DTW - Detroit"],
    [4, "YYZ - Toronto"],
    [5, "PHL - Philadelphia"],
    [6, "ORD - Chicago"],
    [7, "LHR - London"]
  ]);
  

  airportMap: Map<string, number> = new Map<string, number>([
    ["MSP - Minneapolis/St. Paul", 1],
    ["LAX - Los Angeles", 2],
    ["DTW - Detroit", 3],
    ["YYZ - Toronto", 4],
    ["PHL - Philadelphia", 5],
    ["ORD - Chicago", 6],
    ["LHR - London", 7]
  ]);

  

  airportObjects: Array<Airports> =  [
    new Airports(1, "MSP - Minneapolis/St. Paul"),
    new Airports(2, "LAX - Los Angeles"),
    new Airports(3, "DTW - Detroit"), 
    new Airports(4, "YYZ - Toronto"), 
    new Airports(5, "PHL - Philadelphia"), 
    new Airports(6, "ORD - Chicago"), 
    new Airports(7, "LHR - London") ];

  constructor(private router: Router, private data: DataService) {
    //this.flightsFromHome = this.searchPage.flights;
    //this.subscription = this.data.currentFlight.subscribe(resp => this.flightFormDataFromHome = resp)
    
   }

  ngOnInit(): void {
    this.subscription = this.data.currentFlight.subscribe(resp => this.flightFormDataFromHome = resp)
    console.log(this.flightFormDataFromHome.departureLocation);
    console.log(this.airportMapFlipped.get(this.flightFormDataFromHome.departureLocation))
    
  }

  convertIdToName(id: number) {

  }

  reserveFlight(){
    this.router.navigate(['my-flights'])
  }

}

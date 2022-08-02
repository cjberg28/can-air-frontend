import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { HomepageComponent } from '../homepage/homepage.component';
import { Airports } from '../models/Airports';
import { Flight } from '../models/Flight';
import { Person } from '../models/Person';


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
  authorizedPerson: Person;

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
    this.authorizedPerson = new Person();
   }

  ngOnInit(): void {
    this.subscription = this.data.currentFlight.subscribe(resp => this.flightFormDataFromHome = resp)
    this.subscription = this.data.authorizedPerson.subscribe(resp => this.authorizedPerson = resp)
    
    
  }

  
  reserveFlight(){
    this.flightFormDataFromHome.seatsRemaining --;
    this.sendData();
    this.router.navigate(['my-flights']);
  }

  cancelToGoHome() {
    this.router.navigate(['home']);
  }

  sendData(){
    this.data.getFlightFromHome(this.flightFormDataFromHome);
    this.data.getAuthorizedPerson(this.authorizedPerson);
  }
}

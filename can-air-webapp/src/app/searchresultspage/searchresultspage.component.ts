import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FlightApiService } from '../flight-api.service';
import { HomepageComponent } from '../homepage/homepage.component';
import { Flight } from '../models/Flight';



@Component({
  selector: 'app-searchresultspage',
  templateUrl: './searchresultspage.component.html',
  styleUrls: ['./searchresultspage.component.css']
})
export class SearchresultspageComponent implements OnInit {
  flights: Array<any> = [];

  flightsMatchingCriteria: Array<Flight> = [];
  flightService: FlightApiService;
  
  flightFormDataFromHome: Flight = new Flight();
  
  cols :any[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  flightOptions!: Array<MenuItem>;

  // -- FOR TESTING PURPOSES -- //

  
  // --------------------------//

  constructor(private router: Router, service: FlightApiService, private home: HomepageComponent) {
    this.flightService = service;
    this.flightFormDataFromHome = home.flightFormData;
   }

  ngOnInit(): void {
    this.loading = false;
    this.cols = [
      {field: 'flightNumber', header: 'Flight Number'}, 
      {field: 'departing', header: 'Departing'}, 
      {field: 'arriving', header: 'Arriving'}, 
      {field: 'departureDate', header: 'Departure Date'}, 
      {field: 'roundTrip', header: 'Round Trip'},
      {field: 'returnDate', header: 'Return Date'} ,
      {field: 'departureTime', header: 'Departure Time'} ,
      {field: 'arrivalTime', header: 'Arrival Time'} ,
      {field: 'price', header: 'Price'} 
    ];
    // this.findAllFlights();
    this.findFlightsByCriteria();

    

    this.totalRecords = this.flights.length;
    this.flightOptions = [
      {label: 'Reserve Flight',
       icon: 'pi pi-pencil',
       command: () => {
        this.router.navigate(['reserve'])
        }
      }
    ];
    
  }

  findAllFlights(): void{
    this.flightService.getAll().subscribe(resp => {this.flights = resp;})
    console.log(this.flights)
  }

  findFlightsByCriteria(): void {
    this.flightService.getFlightsMatchingCriteria(this.flightFormDataFromHome).subscribe(resp => this.flightsMatchingCriteria)
  }

}

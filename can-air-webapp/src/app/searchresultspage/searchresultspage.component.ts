import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { FlightApiService } from '../flight-api.service';
import { HomepageComponent } from '../homepage/homepage.component';
import { Flight } from '../models/Flight';
import { ReturnedFlight } from '../models/ReturnedFlight';



@Component({
  selector: 'app-searchresultspage',
  templateUrl: './searchresultspage.component.html',
  styleUrls: ['./searchresultspage.component.css'],
   
})
export class SearchresultspageComponent implements OnInit {
  flightFormDataFromHome!: Flight;

  flightId: number = 0;
  
  flights: Array<Flight> = [];

  flightsMatchingCriteria: Array<any> = [];
  flightService: FlightApiService;
  
  // flightFormDataFromHome: Flight;
  cols :any[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  flightOptions!: Array<MenuItem>;

  subscription!: Subscription;
  // matchingFlights!: Map<string, Array<Flight>>;



  // airportMapFlipped: Map<number, string> = new Map<number, string>([
  //   [1, "MSP - Minneapolis/St. Paul"],
  //   [2, "LAX - Los Angeles"],
  //   [3, "DTW - Detroit"],
  //   [4, "YYZ - Toronto"],
  //   [5, "PHL - Philadelphia"],
  //   [6, "ORD - Chicago"],
  //   [7, "LHR - London"]
  // ]);

  airportMap: Map<string, number> = new Map<string, number>([
    ["MSP - Minneapolis/St. Paul", 1],
    ["LAX - Los Angeles", 2],
    ["DTW - Detroit", 3],
    ["YYZ - Toronto", 4],
    ["PHL - Philadelphia", 5],
    ["ORD - Chicago", 6],
    ["LHR - London", 7]
  ]);

  constructor(private router: Router, service: FlightApiService, private data: DataService) {
    this.flightService = service;

    
    
   }

  ngOnInit(): void {
    this.subscription = this.data.currentFlight.subscribe(resp => {this.flightFormDataFromHome = resp;})

    this.loading = false;
    this.cols = [
      {field: 'flightId', header: 'Flight Number'}, 
      {field: 'departureDepartureLocation', header: 'Departing'}, 
      {field: 'departureArrivingLocation', header: 'Arriving'}, 
      {field: 'departureDate', header: 'Departure Date'}, 
      {field: 'roundTrip', header: 'Round Trip'},
      {field: 'returnDate', header: 'Return Date'} ,
      {field: 'departureDepartureTime', header: 'Departure Time'} ,
      {field: 'departureArrivalTime', header: 'Arrival Time'} ,
      {field: 'flightPrice', header: 'Price'} 
    ];
    

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
    // console.log(this.flights)
  }

  findFlightsByCriteria(): void {
    // console.log(this.flightFormDataFromHome)
    this.flightService.getFlightsMatchingCriteria(this.flightFormDataFromHome).subscribe(resp => {
      
      if(resp[0] == true){
        this.flights = resp[1];
      }
      else{
        console.log('No Matching Flights Found')
      }
    });
    
  }

  onSelect(selectedFlight: Flight) {
    this.flightFormDataFromHome = selectedFlight;
    console.log(selectedFlight);
    console.log(this.flightFormDataFromHome)
    this.sendData();
  }

  sendData(){
    this.data.getFlightFromHome(this.flightFormDataFromHome)
  }

}

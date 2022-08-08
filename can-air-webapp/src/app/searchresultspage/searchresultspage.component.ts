import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { FlightApiService } from '../flight-api.service';
import { HomepageComponent } from '../homepage/homepage.component';
import { Flight } from '../models/Flight';
import { Person } from '../models/Person';
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


  constructor(private router: Router, service: FlightApiService, private data: DataService) {
    this.flightService = service;

    this.authorizedPerson = new Person();
    
   }
  
  
  /**
   * Initialize the table to hold different flights that match the criteria
   * Initialize variables for pagination and column mapping
   * 
   */
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
    
  }

  findFlightsByCriteria(): void {
    //make the get request to the API via FlightService and get an array of all flights matching criteria
    this.flightService.getFlightsMatchingCriteria(this.flightFormDataFromHome).subscribe(resp => {
      //resp returned is of type {boolean, Array<flight object>}. the first element of the array is true, then the second
      // element is an array of flights
      if(resp[0] == true){
        this.flights = resp[1];
      }
      else{
        console.log('No Matching Flights Found')
      }
    });
    
  }

  /**
   * Comes from an onClick from the drop down of the split-button on the flight number
   * @param selectedFlight - The flight the user selects by clicking on the drop down of the split-button
   */
  onSelect(selectedFlight: Flight) {
    this.flightFormDataFromHome = selectedFlight;
    console.log(selectedFlight);
    console.log(this.flightFormDataFromHome)
    this.sendData();
    
  }

  //Send out an updated FlightFormData 
  sendData(){
    this.data.getFlightFromHome(this.flightFormDataFromHome);
    
  }

}

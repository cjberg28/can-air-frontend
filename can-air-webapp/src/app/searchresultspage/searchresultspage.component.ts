import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Flight } from '../models/Flight';



@Component({
  selector: 'app-searchresultspage',
  templateUrl: './searchresultspage.component.html',
  styleUrls: ['./searchresultspage.component.css']
})
export class SearchresultspageComponent implements OnInit {
  flights: Array<any> = [];
  //flightsApiService: FlightsApiService
  //filterService: FilterService
  flightItem: Flight = new Flight();
  flightItem2: Flight = new Flight(2000, 'LAX', 'MSP', new Date('2022-07-30'), true, new Date('2022-08-01'), '11:30', '15:30', '09:00', '13:00', '$500')
  cols :any[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  flightOptions!: Array<MenuItem>;

  // -- FOR TESTING PURPOSES -- //

  
  // --------------------------//

  constructor(private router: Router) {

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

    this.flights = [
      this.flightItem, this.flightItem2
    ]

    this.totalRecords = this.flights.length;
    this.flightOptions = [
      {label: 'Reserve Flight',
       icon: 'pi pi-pencil',
       command: () => {
        this.router.navigate(['reserve'])
        }
      }
    ];
    this.flightItem.departing = 'MSP';
    this.flightItem.arriving = 'LAX'
  }

}

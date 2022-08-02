import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { FlightApiService } from '../flight-api.service';
import { Flight } from '../models/Flight';

@Component({
  selector: 'app-myflightspage',
  templateUrl: './myflightspage.component.html',
  styleUrls: ['./myflightspage.component.css']
})
export class MyflightspageComponent implements OnInit {
  flightFormDataFromHome!: Flight;

  subscription!: Subscription

  myFlights: Array<Flight> = []
  flightOptions!: Array<MenuItem>;
  cols :any[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  
  constructor(private router: Router,  private data: DataService) {
    
   }

  ngOnInit(): void {
    this.subscription = this.data.currentFlight.subscribe(resp => {this.flightFormDataFromHome = resp; console.log(resp)})
    this.myFlights.push(this.flightFormDataFromHome);
    console.log(this.myFlights)
  }

  onSelect(selectedFlight: Flight) {
    this.flightFormDataFromHome = selectedFlight;
    console.log(selectedFlight);
    console.log(this.flightFormDataFromHome)
    this.sendData();
  }

  sendData() {
    this.data.getFlightFromHome(this.flightFormDataFromHome);
  }

}

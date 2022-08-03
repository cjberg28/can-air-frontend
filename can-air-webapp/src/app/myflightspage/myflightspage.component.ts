import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { FlightApiService } from '../flight-api.service';
import { Flight } from '../models/Flight';
import { Person } from '../models/Person';
import { Reservation } from '../models/Reservation';
import { UserAuthService } from '../user-auth.service';

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

  myReservations: Array<Reservation> = [];

  authorizedPerson: Person;
  
  constructor(private router: Router,  private data: DataService, private auth: UserAuthService) {
    this.authorizedPerson = new Person();
   }

  ngOnInit(): void {
    this.subscription = this.data.currentFlight.subscribe(resp => {this.flightFormDataFromHome = resp; console.log(resp)})
    // this.myFlights.push(this.flightFormDataFromHome);
    // console.log(this.myFlights)
    // const testRes = new Reservation(1, 2, 3, 'Atul', 'Mishra', '111-111-1111', 'abc@123.com', new Date('1989-03-09'), new Date('2022-08-18'), 'MSP', 'LAX', true, new Date('2022-08-20'));
    
    // this.myReservations.push(testRes);

    // get authorizedPerson from previous component
    this.subscription = this.auth.authorizedPerson.subscribe(resp => this.authorizedPerson = resp)
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

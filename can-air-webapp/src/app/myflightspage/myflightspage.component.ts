import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CurrentReservationDetailsService } from '../current-reservation-details.service';
import { DataService } from '../data.service';
import { FlightApiService } from '../flight-api.service';
import { Flight } from '../models/Flight';
import { Person } from '../models/Person';
import { Reservation } from '../models/Reservation';
import { ReservationApiService } from '../reservation-api.service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-myflightspage',
  templateUrl: './myflightspage.component.html',
  styleUrls: ['./myflightspage.component.css']
})
export class MyflightspageComponent implements OnInit {
  flightFormDataFromHome!: Flight;

  subscription!: Subscription

  // myFlights: Array<Flight> = []
  flightOptions!: Array<MenuItem>;
  cols :any[] = [];
  totalRecords: number = 0;
  loading: boolean = true;

  myReservation: Reservation = new Reservation();
  myReservations!: Array<Reservation>;

  authorizedPerson: Person;
  
  constructor(private router: Router,  private data: DataService, private auth: UserAuthService, private res: ReservationApiService, private currentRes: CurrentReservationDetailsService) {
    this.authorizedPerson = new Person();
   }

  ngOnInit(): void {
    this.subscription = this.data.currentFlight.subscribe(resp => {this.flightFormDataFromHome = resp; console.log(resp)})
    
    
    // this.myReservations.push(testRes);

    // get authorizedPerson from previous component
    this.subscription = this.auth.authorizedPerson.subscribe(resp => this.authorizedPerson = resp)
    console.log(this.authorizedPerson)
    // get currentReservation from previous component
    this.subscription = this.currentRes.currentReservation.subscribe(resp => this.myReservation = resp)
    console.log(this.myReservation)
     /*
     - since User & Person are in one to one and we have cascading primary keys
     - we can assume that userId = personId
     - so that we can pass in the personId as the userId in order to get the big reservation details object
     - this call gets all reservations for a given userId
    */
     this.res.getBigReservationDetails(this.authorizedPerson.personId).subscribe(resp => {this.myReservations = resp; console.log(resp)})



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

  sendAuthUser() {
    this.auth.getAuthorizedPerson(this.authorizedPerson);
  }

  sendReservation() {
    
  }

}

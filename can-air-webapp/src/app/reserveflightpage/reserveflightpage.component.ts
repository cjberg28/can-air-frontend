import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurrentReservationDetailsService } from '../current-reservation-details.service';
import { DataService } from '../data.service';
import { HomepageComponent } from '../homepage/homepage.component';
import { Airports } from '../models/Airports';
import { Flight } from '../models/Flight';
import { Person } from '../models/Person';
import { Reservation } from '../models/Reservation';
import { SmallReservation } from '../models/SmallReservation';
import { SpecialReservation } from '../models/SpecialReservation';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReservationApiService } from '../reservation-api.service';
import { UserAuthService } from '../user-auth.service';


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
  authorizedPerson!: Person;

  reservation: Reservation = new Reservation();

  smallReservation: SmallReservation = new SmallReservation();
  specialReservation: SpecialReservation = new SpecialReservation();

  objectReturnedAfterSaveReservation: any = {
    "reservationId": 0,
    "flightId": 0,
    "userId": 0
  };
  /* 
    this object will be:
    {
      reservationId : 12,
      flightId: 7,
      userId : 3
    }
    once you get the reservationId back after a successful reservation, assign this reservationId to the current reservation
  */

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

  constructor(private router: Router, private data: DataService, 
    private auth: UserAuthService, private reservationService: ReservationApiService,
    private currentRes: CurrentReservationDetailsService)
    {
    
   }

  ngOnInit(): void {
    // initialize current flight details
    this.subscription = this.data.currentFlight.subscribe(resp => this.flightFormDataFromHome = resp)
    
    //on init, call the user auth service's authorizedPerson observable object and subscribe to get the latest authorizedPerson
    this.subscription = this.auth.authorizedPerson.subscribe(resp => this.authorizedPerson = resp)
    console.log(this.authorizedPerson)
    
    //on init, set reservation.firstName = authorizedPerson.firstName, etc.
    this.reservation.firstName = this.authorizedPerson.firstName;
    this.reservation.lastName = this.authorizedPerson.lastName;
    this.reservation.email = this.authorizedPerson.email;
    this.reservation.phone = this.authorizedPerson.phoneNumber;
    this.reservation.dob = this.authorizedPerson.dateOfBirth;

    /* 
      - setting the reservation's userId = authorizedPerson's personId because they are assumed to be equal
      - saves us an extra call to the DB to get the userId based on personId
    */
    this.reservation.userId = this.authorizedPerson.personId;
  }

  
  reserveFlight(){
    // this.flightFormDataFromHome.seatsRemaining --;

    // set the current big reservation's flight id, user id, and other fields
    this.reservation.flightId = this.flightFormDataFromHome.flightId;
    
    this.specialReservation.flightId = this.reservation.flightId;
    //this.specialReservation.reservationId = this.reservation.reservationId;
    this.specialReservation.userId = this.reservation.userId;
    this.specialReservation.reservationFirstName = this.reservation.firstName;
    this.specialReservation.reservationLastName = this.reservation.lastName;
    this.specialReservation.reservationEmail = this.reservation.email;
    this.specialReservation.reservationPhone = this.reservation.phone;
    //added user and flight objects because we need this for create reservation due to constrains by Hibernate
    this.specialReservation.user = {userId: this.reservation.userId};
    this.specialReservation.flight = {flightId: this.reservation.flightId};
    //
    this.reservationService.saveReservation(this.specialReservation).subscribe(resp => {console.log(resp); this.objectReturnedAfterSaveReservation = resp;})

    //assign current reservation's Id to the reservationId returned after save()
    this.reservation.reservationId = this.objectReturnedAfterSaveReservation.reservationId;
    console.log(this.objectReturnedAfterSaveReservation);

    this.sendData();   
    this.sendAuthUser();
    this.sendReservation();

    console.log(this.reservation)
    this.router.navigate(['my-flights']);
  }

  cancelToGoHome() {
    this.router.navigate(['home']);
  }

  sendData(){
    this.data.getFlightFromHome(this.flightFormDataFromHome);
    
  }

  sendAuthUser() {
    this.auth.getAuthorizedPerson(this.authorizedPerson);
  }

  sendReservation() {
    this.currentRes.getCurrentReservation(this.reservation)
  }

}

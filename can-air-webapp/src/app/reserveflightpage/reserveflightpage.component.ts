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

  anyFieldEmpty: boolean = true;

  concurrency: boolean;
  displayModal: boolean;


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
      this.concurrency = false;
      this.displayModal = true;
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

    // check if all fields have a value that is different from the default values
    // if(this.reservation.userId != 0 &&
    //   this.reservation.firstName != '' &&
    //   this.reservation.lastName != '' && 
    //   this.reservation.phone != '' &&
    //   this.reservation.email != '' &&
    //   this.reservation.dob != null){
    //     this.anyFieldEmpty = false;
    //   }
  }

  /**
   * This method is called when the user clicks the confirm button on the credit card info modal
   * Makes a post request via ReservationApiService and gets back a SpecialReservation object
   * SpecialReservation has an extra user: {userId: } and flight: {flightId: } fields
   *  as well as all other fields of SmallReservation.
   * It first sets the user details into it via the currentReservation object being passed around the components
   *  as well as the FlightFormData.
   * It checks for concurrency and flips a boolean for an *ngIf
   *  - redirects to my-flights if concurrency hits
   */
  reserveFlight(): void{
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
    this.specialReservation.reservationDateOfBirth = this.reservation.dob;
    //added user and flight objects because we need this for create reservation due to constrains by Hibernate
    this.specialReservation.user = {userId: this.reservation.userId};
    this.specialReservation.flight = {flightId: this.reservation.flightId};

    //resp could be null if the save failed
    this.reservationService.saveReservation(this.specialReservation).subscribe(resp => {console.log(resp);
      if (resp != null && resp.hasOwnProperty('flightId')) {//If a successful save occurred... (else it would be null)
        let respAny :any = resp as any;
        console.log(respAny);
        this.objectReturnedAfterSaveReservation.reservationId = respAny.reservationId;
        this.objectReturnedAfterSaveReservation.flightId = respAny.flightId;
        this.objectReturnedAfterSaveReservation.userId = respAny.userId;
        this.objectReturnedAfterSaveReservation.reservationFirstName = respAny.reservationFirstName;
        this.objectReturnedAfterSaveReservation.reservationLastName = respAny.reservationLastName;
        this.objectReturnedAfterSaveReservation.reservationPhone = respAny.reservationPhone;
        this.objectReturnedAfterSaveReservation.reservationEmail = respAny.reservationEmail;
        this.objectReturnedAfterSaveReservation.reservationDateOfBirth = respAny.reservationDateOfBirth;
        console.log(this.objectReturnedAfterSaveReservation.reservationPhone);//Valid phone number
      } else {//null returned - save failed due to no seats remaining
        this.concurrencyOccurred();
        console.log("Concurrency Variable inside subscribe block: " + this.concurrency);//true
      }
    });

    //assign current reservation's Id to the reservationId returned after save()
    this.reservation.reservationId = this.objectReturnedAfterSaveReservation.reservationId;//Still set to 0 yet code works
    console.log(this.objectReturnedAfterSaveReservation.flightId);//0
    console.log(this.objectReturnedAfterSaveReservation.reservationId);//0

    console.log("Concurrency Variable: " + this.concurrency);//false
    if(!this.concurrency) {//Successful save occurred
      this.sendData();   
      this.sendAuthUser();
      this.sendReservation();

      this.router.navigate(['my-flights']);
    }

  }

  concurrencyOccurred() {
    this.concurrency = true;
  }

  cancelToGoHome() {
    this.router.navigate(['home']);
  }

  // Send out the FlightFormData, authorizedPerson, and currentReservation to other components as an Observable
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

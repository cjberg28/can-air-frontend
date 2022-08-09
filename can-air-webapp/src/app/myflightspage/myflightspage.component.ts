import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CurrentReservationDetailsService } from '../current-reservation-details.service';
import { DataService } from '../data.service';
import { FlightApiService } from '../flight-api.service';
import { Flight } from '../models/Flight';
import { Person } from '../models/Person';
import { Reservation } from '../models/Reservation';
import { SmallReservation } from '../models/SmallReservation';
import { ReservationApiService } from '../reservation-api.service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-myflightspage',
  templateUrl: './myflightspage.component.html',
  styleUrls: ['./myflightspage.component.css'],
})
export class MyflightspageComponent implements OnInit {
  flightFormDataFromHome!: Flight;

  subscription!: Subscription;

  // myFlights: Array<Flight> = []
  flightOptions!: Array<MenuItem>;
  cols: any[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  // isTableOn: boolean = true;

  //actual reservation object matching the fields in the database
  mySmallReservation: SmallReservation = new SmallReservation();

  //big reservation object to capture big reservation JSON sent by API
  myBigReservation: Reservation = new Reservation();
  myBigReservationIdToDelete!: number;
  myBigReservationsArray!: Array<Reservation>;

  authorizedPerson: Person; //contains the authorizedPerson object/user details after successful login

  isUpdateSuccessful: any;
  isDeleteSuccessful: any = false;

  displayModal2: boolean = true;
  isCloseable: boolean = true;
  clickedUpdate2: boolean = false;

 
  airportMapFlipped: Map<number, string> = new Map<number, string>([
    [1, "MSP - Minneapolis/St. Paul"],
    [2, "LAX - Los Angeles"],
    [3, "DTW - Detroit"],
    [4, "YYZ - Toronto"],
    [5, "PHL - Philadelphia"],
    [6, "ORD - Chicago"],
    [7, "LHR - London"]
  ]);

  constructor(
    private router: Router,
    private data: DataService,
    private auth: UserAuthService,
    private reservationService: ReservationApiService,
    private currentRes: CurrentReservationDetailsService
  ) {
    this.authorizedPerson = new Person();
  }

// -------------------------------------------------------------------------------------//
// ngOnInit --------------------------
//-------------------------------------------------------------------------------------//
/**
 * Initialize the flightFormData sent from homepage component
 * Contains the search criteria (departing, arriving, roundtrip, depDate and retDate)
 * 
 * Initialize the authorizedPerson object sent from navbar component's login using UserAuthService
 */
  ngOnInit(): void {
    this.subscription = this.data.currentFlight.subscribe((resp) => {
      this.flightFormDataFromHome = resp;
      console.log(resp);
    });

    // get authorizedPerson from previous component
    this.subscription = this.auth.authorizedPerson.subscribe(
      (resp) => (this.authorizedPerson = resp)
    );
    console.log(this.authorizedPerson);
    // get currentReservation from previous component
    this.subscription = this.currentRes.currentReservation.subscribe(
      (resp) => {(this.myBigReservation = resp);
      });
    // console.log(this.myBigReservation); //Dates and times work, has a return date when one-way flight?
    // console.log(this.myBigReservation.userId); //0
    // console.log(this.myBigReservation.flightId); //0
    // console.log(this.myBigReservation.reservationId); //0
    // console.log(this.myBigReservation.firstName); //""
    // console.log(this.myBigReservation.lastName); //""
    // console.log(this.myBigReservation.phone); //""
    // console.log(this.myBigReservation.email); //""
    // console.log(this.myBigReservation.dob); //null
    
    /**
     * Each row in the table is one myBigReservation. 
     */
    this.mySmallReservation.userId = this.myBigReservation.userId; //
    this.mySmallReservation.flightId = this.myBigReservation.flightId; //0
    this.mySmallReservation.reservationId = this.myBigReservation.reservationId; //0
    this.mySmallReservation.reservationFirstName = this.myBigReservation.firstName; //""
    this.mySmallReservation.reservationLastName = this.myBigReservation.lastName; //""
    this.mySmallReservation.reservationPhone = this.myBigReservation.phone; // ""
    this.mySmallReservation.reservationEmail = this.myBigReservation.email; // ""
    this.mySmallReservation.reservationDateOfBirth = this.myBigReservation.dob; // null

    /*
     - since User & Person are in a one-to-one relationship and we have cascading primary keys
     - we can assume that userId = personId
     - so that we can pass in the personId as the userId in order to get the big reservation details object
     - this call gets all reservations for a given userId
    */
    this.reservationService.getBigReservationDetails(this.authorizedPerson.personId).subscribe((resp) => {
      //resp here is an array of BigReservation objects
        this.myBigReservationsArray = resp;
        console.log(resp);
      });
      // console.log("big reservation after getBigRes " + this.myBigReservation)

    /**
     * The options for the drop down on the split-button that is each reservation's flight
     * Clicking Update Reservation button calls this.clickedUpdate() --> 
     */
    this.flightOptions = [
      {
        label: 'Update Reservation',
        icon: 'pi pi-replay',
        command: () => {
          this.clickedUpdate();

          console.log('ngOnInit small res: ' + this.mySmallReservation);
          console.log('ngOnInIt big res: ' + this.myBigReservation)
        },
      },
      {
        label: 'Cancel Reservation',
        icon: 'pi pi-times',
        command: () => {this.cancelReservation(this.mySmallReservation.reservationId, this.mySmallReservation.flightId)},
      },
    ];
  }

  /**
   * This method is called when the user clicks on the dropdown on the split-button
   * @param selectedReservation - the captured Big Reservation on click since we have that value inside ngFor="flight of myBigReservationsArray
   * It can now be passed back to the component as selectedReservation and set to a Small Reservation object
   * Which can be used to send back updated reservation object for the put request"
   */
  onSelect(selectedReservation: Reservation) {
    // this.myBigReservationIdToDelete = selectedReservation.reservationId
    // console.log(this.myBigReservationIdToDelete);
    this.mySmallReservation.flightId = selectedReservation.flightId;
    this.mySmallReservation.reservationId = selectedReservation.reservationId;
    this.mySmallReservation.userId = selectedReservation.userId;
    this.mySmallReservation.reservationDateOfBirth = selectedReservation.dob;
    this.mySmallReservation.reservationEmail = selectedReservation.email;
    this.mySmallReservation.reservationFirstName = selectedReservation.firstName;
    this.mySmallReservation.reservationLastName = selectedReservation.lastName;
    this.mySmallReservation.reservationPhone = selectedReservation.phone;

    //send updated reservation details to the next component
    this.sendData();
  }

  

  /**
   * boolean flip for ngIf
   */
  clickedUpdate() {
    // this.isTableOn = false;
    this.clickedUpdate2 = true;
  }

  /**
   * This method is called when user clicks on Cancel on the pop up modal with all the input fields
   * boolean flip for ngIf
   */
  cancelUpdate() {
    this.displayModal2 = false;
    this.ngOnInit();
  }
  
  /**
   * This method is called when user clicks Confirm
   */
  confirmedUpdate() {
    // console.log(this.mySmallReservation) //Everything is empty in this specific console log?
    // console.log(this.mySmallReservation.flightId)//0
    // console.log(this.mySmallReservation.userId)//0          // THESE IDS ARE 0
    // console.log(this.mySmallReservation.reservationId)//0
    // console.log(this.mySmallReservation.reservationFirstName)//Works!
    // console.log(this.mySmallReservation.reservationLastName)//Works!
    // console.log(this.mySmallReservation.reservationPhone)//Works!
    // console.log(this.mySmallReservation.reservationDateOfBirth)//Works!
    // console.log(this.mySmallReservation.reservationEmail)//Works!

    this.reservationService.updateReservation(this.mySmallReservation).subscribe((resp: any) => {
      this.isUpdateSuccessful = resp; 
      console.log('Resp after sending put request: ' + resp);
      console.log(this.mySmallReservation.reservationEmail)
    });
      // console.log('small reservation after put'+ this.mySmallReservation)
    this.displayModal2 = false;
    this.ngOnInit();
    
    //don't need to do this
    // this.router.navigate(['my-flights']);
    // this.isTableOn = true;
  }

  /**
   * This method is called when the user clicks on the Cancel Reservation button on the split-button
   * Sends delete request to the API via ReservationApiService
   * Need to figure out a way to dynamically show changes in the table
   * @param reservationId 
   * @param flightId 
   */
  cancelReservation(reservationId: number, flightId: number) {
    this.reservationService.deleteReservation(reservationId, flightId).subscribe(resp => console.log(resp))
    // this.flightFormDataFromHome.seatsRemaining ++;  //This is handled in the back end, since the database must be updated
    this.router.navigate(['my-flights'])
    
    //send updated flightFormData and authorizedPerson to other components
    this.sendData();
    this.sendAuthUser();
    
  }

  sendData() {
    this.data.getFlightFromHome(this.flightFormDataFromHome);
  }

  sendAuthUser() {
    this.auth.getAuthorizedPerson(this.authorizedPerson);
  }

  sendReservation(reservation: Reservation) {
    this.currentRes.getCurrentReservation(this.myBigReservation)
  }

  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
}

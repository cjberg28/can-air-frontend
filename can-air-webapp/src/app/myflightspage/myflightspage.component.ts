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

  //actual reservation object matching the DB
  mySmallReservation: SmallReservation = new SmallReservation();

  //big reservation object to capture big reservation JSON
  myBigReservation: Reservation = new Reservation();
  myBigReservationIdToDelete!: number;
  myBigReservationsArray!: Array<Reservation>;

  authorizedPerson: Person;

  isUpdateSuccessful: any = false;
  isDeleteSuccessful: any = false;

  displayModal2: boolean = true;
  isCloseable: boolean = true;
  clickedUpdate2: boolean = false;

 
  
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
        console.log(resp);//Weird - logs current date and time!
        console.log(resp.userId);//0
        console.log(resp.flightId);//0
        console.log(resp.reservationId);//0
        console.log(resp.firstName);//""
        console.log(resp.lastName);//""
        console.log(resp.phone);//""
        console.log(resp.email);//""
        console.log(resp.dob);//null
      
      
      } 
    );
    console.log(this.myBigReservation); //Dates and times work, has a return date when one-way flight?
    console.log(this.myBigReservation.userId); //0
    console.log(this.myBigReservation.flightId); //0
    console.log(this.myBigReservation.reservationId); //0
    console.log(this.myBigReservation.firstName); //""
    console.log(this.myBigReservation.lastName); //""
    console.log(this.myBigReservation.phone); //""
    console.log(this.myBigReservation.email); //""
    console.log(this.myBigReservation.dob); //null

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
      //resp here is an array of person objects
        this.myBigReservationsArray = resp;
        console.log(resp);
      });

      console.log("big reservation after getBigRes " + this.myBigReservation)
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
        command: () => {this.cancelReservation(this.myBigReservationIdToDelete)},
      },
    ];
  }

  onSelect(selectedReservation: Reservation) {
    this.myBigReservationIdToDelete = selectedReservation.reservationId
    console.log(this.myBigReservationIdToDelete);
    this.sendData();
  }

  

  clickedUpdate() {
    this.clickedUpdate2 = true;
  }

  cancelUpdate() {
    this.displayModal2 = false;
    this.ngOnInit();
  }

  confirmedUpdate() {
    console.log(this.mySmallReservation) //Everything is empty in this specific console log?
    console.log(this.mySmallReservation.flightId)//0
    console.log(this.mySmallReservation.userId)//0          // THESE IDS ARE 0
    console.log(this.mySmallReservation.reservationId)//0
    console.log(this.mySmallReservation.reservationFirstName)//Works!
    console.log(this.mySmallReservation.reservationLastName)//Works!
    console.log(this.mySmallReservation.reservationPhone)//Works!
    console.log(this.mySmallReservation.reservationDateOfBirth)//Works!
    console.log(this.mySmallReservation.reservationEmail)//Works!
    this.reservationService.updateReservation(this.mySmallReservation).subscribe((resp: any) => {
      this.isUpdateSuccessful = resp; 
      console.log('Resp after sending put request: ' + resp);
      console.log(this.mySmallReservation.reservationEmail)
    });
      // console.log('small reservation after put'+ this.mySmallReservation)
    this.displayModal2 = false;
    this.ngOnInit();
  }

  cancelReservation(reservationId: number) {
    this.reservationService.deleteReservation(reservationId).subscribe(resp => console.log(resp))
    this.flightFormDataFromHome.seatsRemaining ++;  //if reservation is cancelled, a seat opens up
    this.router.navigate(['my-flights'])
    
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
}

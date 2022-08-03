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
  myBigReservations!: Array<Reservation>;

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
    private res: ReservationApiService,
    private currentRes: CurrentReservationDetailsService
  ) {
    this.authorizedPerson = new Person();
  }

  ngOnInit(): void {
    this.subscription = this.data.currentFlight.subscribe((resp) => {
      this.flightFormDataFromHome = resp;
      console.log(resp);
    });

    // this.myBigReservations.push(testRes);

    // get authorizedPerson from previous component
    this.subscription = this.auth.authorizedPerson.subscribe(
      (resp) => (this.authorizedPerson = resp)
    );
    console.log(this.authorizedPerson);
    // get currentReservation from previous component
    this.subscription = this.currentRes.currentReservation.subscribe(
      (resp) => (this.myBigReservation = resp)
    );
    console.log(this.myBigReservation);

    this.mySmallReservation.flightId = this.myBigReservation.flightId;
    this.mySmallReservation.reservationId = this.myBigReservation.reservationId;
    this.mySmallReservation.reservationFirstName = this.myBigReservation.firstName;
    this.mySmallReservation.reservationLastName = this.myBigReservation.lastName;
    this.mySmallReservation.reservationPhone = this.myBigReservation.phone;
    this.mySmallReservation.reservationEmail = this.myBigReservation.email;
    this.mySmallReservation.reservationDateOfBirth = this.myBigReservation.dob;
    /*
     - since User & Person are in one to one and we have cascading primary keys
     - we can assume that userId = personId
     - so that we can pass in the personId as the userId in order to get the big reservation details object
     - this call gets all reservations for a given userId
    */
    this.res
      .getBigReservationDetails(this.authorizedPerson.personId)
      .subscribe((resp) => {
        this.myBigReservations = resp;
        console.log(resp);
      });

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
        command: () => {},
      },
    ];
  }

  onSelect(selectedFlight: Flight) {
    this.flightFormDataFromHome = selectedFlight;
    console.log(selectedFlight);
    console.log(this.flightFormDataFromHome);
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
    
    this.res
      .updateReservation(this.mySmallReservation)
      .subscribe((resp: any) => {this.isUpdateSuccessful = resp; console.log('Resp after sending put request: ' + resp)});
      // console.log('small reservation after put'+ this.mySmallReservation)
    this.displayModal2 = false;
    this.ngOnInit();
  }

  cancelReservation(smallRes: SmallReservation) {
    this.ngOnInit();
  }

  sendData() {
    this.data.getFlightFromHome(this.flightFormDataFromHome);
  }

  sendAuthUser() {
    this.auth.getAuthorizedPerson(this.authorizedPerson);
  }

  sendReservation() {}
}

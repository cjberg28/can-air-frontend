import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from '../models/Flight';
import { FlightApiService } from '../flight-api.service';
import { FilterService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { SearchresultspageComponent } from '../searchresultspage/searchresultspage.component';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import { Person } from '../models/Person';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
 
})
export class HomepageComponent implements OnInit {
 
  
  airports: string[] = [];
  isProgressSpinnerActivated: boolean = false;
  flightFormData: Flight = new Flight();
  homeData: Flight = new Flight();
  searchDisabled: boolean = true;
  authorizedPerson: Person;
  

  //convert destinationIds to airport names and vice versa
  airportMap: Map<string, number> = new Map<string, number>([
    ["MSP - Minneapolis/St. Paul", 1],
    ["LAX - Los Angeles", 2],
    ["DTW - Detroit", 3],
    ["YYZ - Toronto", 4],
    ["PHL - Philadelphia", 5],
    ["ORD - Chicago", 6],
    ["LHR - London", 7]
  ]);

  searchParameters: Map<string, object> = new Map<string, object>([
    
  ]);

  airportObjects: IterableIterator<string> = this.airportMap.keys();
  
  airportNames = Array.from(this.airportObjects);
  
  
  constructor(private router: Router, private service: FlightApiService, private data: DataService, private datePipe: DatePipe) {    
    this.authorizedPerson = new Person();
    
   }
  
  /**
   * Initialize the currentFlight object in order to maintain current flight details
   * when redirected back from reserveFlight component if concurrency is true
   */
  ngOnInit(): void {    
    this.data.currentFlight.subscribe(resp => this.flightFormData = resp)
    // this.data.authorizedPerson.subscribe(resp => this.authorizedPerson)
  }
  
  /**
   * This method is called when the user hits the Search button after all input fields have been
   * given the appropriate values.
   */
  searchFlights() {
    
    if(this.searchDisabled == true){

    }
    else{
      //cause 2 second timeout to allow for loading transition
      this.isProgressSpinnerActivated = true;
      setTimeout(() => {this.sendData(); this.router.navigate(['flights']);}, 2000);
    }
  }

  /**
   * This method returns true if all fields are filled, false if not
   * @returns isDisabled: boolean
   */
  requiredFieldsFilled() {

    //Making today and yesterday variables to compare flightFormData's default return date
    //which is set to yesterday's date
    let today = new Date();
    today.setDate(today.getDate());
    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate()-1);
    let isDisabled: boolean = true;
    

    
    if(this.flightFormData.departureLocation != '' && this.flightFormData.arrivalLocation != '' 
      && this.flightFormData.departureDate > yesterday && this.flightFormData.roundTrip != true){
      isDisabled = false;
      
    }

    if(this.flightFormData.departureLocation != '' && this.flightFormData.arrivalLocation != '' 
      && this.flightFormData.departureDate > yesterday && this.flightFormData.roundTrip == true){
      isDisabled = true;

    }

    if(this.flightFormData.departureLocation != '' && this.flightFormData.arrivalLocation != '' 
    && this.flightFormData.departureDate > yesterday && this.flightFormData.roundTrip == true 
    && this.flightFormData.returnDate > yesterday){
    isDisabled = false;
    
    }

    this.searchDisabled = isDisabled
    return isDisabled;
  }

  /**
   * send out flightFormData to other components
   */
  sendData(){
    
    this.data.getFlightFromHome(this.flightFormData);
    
  }

  
  
  
}

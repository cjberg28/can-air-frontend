import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from '../models/Flight';
import { FlightApiService } from '../flight-api.service';
import { FilterService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  
  // departing?: string;
  // arriving?: string;
  // departureDate?: Date;
  // isRoundTrip?: boolean;
  // returnDate?: Date;
  airports: string[] = [];
  isProgressSpinnerActivated: boolean = false;
  flightFormData: Flight = new Flight();
  

  //to parse names and ids... not sure what to do with this though
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
  

  constructor(private router: Router, private service: FlightApiService) {

    
    this.airports = [
      
    ];

    this.flightFormData.departureLocation
    
    
   }

  ngOnInit(): void {    
    console.log(this.airportObjects)
  }

  searchFlights() {
    this.isProgressSpinnerActivated = true;
    setTimeout(() => {this.router.navigate(['flights']);}, 2000);
    console.log(this.flightFormData);
  }

  requiredFieldsFilled() {
    let today = new Date();
    today.setDate(today.getDate());
    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate()-1);
    let isDisabled: boolean = true;
    

    //Making today and yesterday variables to compare flightFormData's default return date
    //which is set to yesterday's date
    
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

    return isDisabled;
  }

}

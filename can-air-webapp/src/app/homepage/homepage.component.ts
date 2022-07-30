import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from '../models/Flight';
import { FlightApiService } from '../flight-api.service';



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
    ["MSP", 1],
    ["LAX", 2],
    ["DTW", 3],
    ["YYZ", 4],
    ["PHL", 5],
    ["ORD", 6],
    ["LHR", 7]
  ]);

  searchParameters: Map<string, object> = new Map<string, object>([
    
  ]);

  constructor(private router: Router, private service: FlightApiService) {
    
   }

  ngOnInit(): void {
    this.airports = [
      'MSP - Minneapolis/St. Paul',
      'LAX - Los Angeles',
      'DTW - Detroit',
      'YYZ - Toronto',
      'PHL - Philadelphia',
      'ORD - Chicago',
      'LHR - London'
    ]
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

    
    console.log('checking departing ' + (this.flightFormData.departing != ''));
    console.log("checking arriving " + (this.flightFormData.arriving != ''));
    console.log('checking departure date ' + (this.flightFormData.departureDate > yesterday));
    console.log('checking roundTrip ' + this.flightFormData.isRoundTrip);
    if(this.flightFormData.departing != '' && this.flightFormData.arriving != '' 
      && this.flightFormData.departureDate > yesterday && this.flightFormData.isRoundTrip != true){
      isDisabled = false;
      
      console.log(isDisabled + ' first 3 fields');
      // if(this.flightFormData.returnDate < today){
      //   isDisabled = true;
      // }
    }

    if(this.flightFormData.departing != '' && this.flightFormData.arriving != '' 
      && this.flightFormData.departureDate > yesterday && this.flightFormData.isRoundTrip == true){
      isDisabled = true;

    }

    if(this.flightFormData.departing != '' && this.flightFormData.arriving != '' 
    && this.flightFormData.departureDate > yesterday && this.flightFormData.isRoundTrip == true 
    && this.flightFormData.returnDate > yesterday){
    isDisabled = false;
    
    }


    //Making today and yesterday variables to compare flightFormData's default return date
    //which is set to yesterday's date
   

    
    return isDisabled;
  }

}

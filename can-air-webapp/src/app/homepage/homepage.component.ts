import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  departing?: string;
  arriving?: string;
  departureDate?: Date;
  isRoundTrip?: boolean;
  returnDate?: Date;
  airports: string[] = [];
  isProgressSpinnerActivated: boolean = false;

  constructor(private router: Router) { }

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
  }

  

}

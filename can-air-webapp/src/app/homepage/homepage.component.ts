import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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

  

}

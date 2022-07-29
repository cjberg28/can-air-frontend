import { Component, OnInit } from '@angular/core';
import { HomepageComponent } from '../homepage/homepage.component';
import { Flight } from '../models/Flight';

@Component({
  selector: 'app-reserveflightpage',
  templateUrl: './reserveflightpage.component.html',
  styleUrls: ['./reserveflightpage.component.css']
})
export class ReserveflightpageComponent implements OnInit {

  flightFormDataFromHome: Flight = new Flight();
  homeComponent: HomepageComponent;

  constructor(homeComponent: HomepageComponent) {
    this.homeComponent = homeComponent;
   }

  ngOnInit(): void {
    this.flightFormDataFromHome = this.homeComponent.flightFormData;
  }

}

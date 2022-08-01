import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomepageComponent } from '../homepage/homepage.component';
import { Flight } from '../models/Flight';
import { SearchresultspageComponent } from '../searchresultspage/searchresultspage.component';

@Component({
  selector: 'app-reserveflightpage',
  templateUrl: './reserveflightpage.component.html',
  styleUrls: ['./reserveflightpage.component.css']
})
export class ReserveflightpageComponent implements OnInit {

  flightsFromHome: Array<Flight> = [];
  flightFormDataFromHome: Flight = new Flight();
  cardNumber: number = 0;


  constructor(private searchPage: SearchresultspageComponent, private router: Router) {
    this.flightsFromHome = this.searchPage.flights;
    
   }

  ngOnInit(): void {
    
    
  }

  reserveFlight(){
    this.router.navigate(['my-flights'])
  }

}

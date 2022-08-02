import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
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
  flightFormDataFromSearch: Flight = new Flight();
  cardNumber: number = 0;

  subscription!: Subscription;

  constructor(private searchPage: SearchresultspageComponent, private router: Router, private data: DataService) {
    //this.flightsFromHome = this.searchPage.flights;
    
   }

  ngOnInit(): void {
    this.subscription = this.data.currentFlight.subscribe(resp => this.flightFormDataFromSearch = resp)
    
  }

  reserveFlight(){
    this.router.navigate(['my-flights'])
  }

}

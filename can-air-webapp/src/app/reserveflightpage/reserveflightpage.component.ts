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

  flightFormDataFromHome: Flight = new Flight();


  constructor(private searchPage: SearchresultspageComponent, private router: Router) {

   }

  ngOnInit(): void {
    
    this.flightFormDataFromHome = this.searchPage.flightItem2
  }

  reserveFlight(){
    this.router.navigate(['my-flights'])
  }

}

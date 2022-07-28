import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myflightspage',
  templateUrl: './myflightspage.component.html',
  styleUrls: ['./myflightspage.component.css']
})
export class MyflightspageComponent implements OnInit {
  flights: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}

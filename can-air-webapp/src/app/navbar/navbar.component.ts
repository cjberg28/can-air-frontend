import { Component, OnInit, OnChanges } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from '../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];
  currentUser?: User;
  isUserLoggedIn: boolean = false;
  displayModal: boolean = false;

  //declare variables to hold username and password
  username: string = '';
  password: string = '';
  constructor() {

  }

  ngOnInit(): void {
    //cleans the username and password field onInit
    this.username= '';
    this.password = '';

    this.items = [{
      label: 'Home'
    },
    { label: 'My Flights' },
    {
      label: 'Login',
      command: () => { this.giveLoginDialogBox(); }
    },
    {
      label: this.getUsername(),
      items: [{
        label: 'Sign Out',
        command: () => { this.logout(); }
      }]
    }


    ];



  }


  giveLoginDialogBox(): void {
    // alert('Logging in');
    this.showModalDialog();
    this.clickedLogin();
    this.currentUser = new User("Atul Mishra");
    this.ngOnInit();
  }

  getUsername(): string {
    if (this.currentUser == undefined) {//If the user hasn't logged in...
      return "Not Signed In";
    } else {
      return "Hello, " + this.currentUser.name;
    }
  }

  logout(): void {
    alert('Logging out');
    this.currentUser = undefined;
    this.displayModal = false;
    this.ngOnInit();
    //Router link to Home component.
  }

  clickedLogin(): boolean {
    this.isUserLoggedIn = true;//this.isUserLoggedIn = !this.isUserLoggedIn;
    console.log(this.isUserLoggedIn);
    return this.isUserLoggedIn;
  }

  showModalDialog(): void {
    if (this.currentUser == undefined) {//If the user hasn't logged in...
      this.displayModal = true;
    }
  }

  login() {
    //on the backend, check if username and password match
    //if they do, return the full user
    //if they don't, return null
    //then check if null or not
    // if((loginService.getUser(username, password) != null){
    //   this.displayModal = false;
    //   this.ngOnInit();
    // }
    if(this.username === 'amishra' && this.password==='hello'){
      this.displayModal=false;
      this.ngOnInit();
    }
    else{
      alert('Incorrect username or password')
    }
  }




}
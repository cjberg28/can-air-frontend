import { Component, OnInit, OnChanges } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from '../models/User';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LoginAPIService } from '../login-api.service';
import { LoginCreds } from '../models/LoginCreds';
import { Person } from '../models/Person';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

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
  isUserLoggedOut: boolean = false;
  displayModal2: boolean = false;

  loginCreds: LoginCreds;
  subscription!: Subscription;
  
  authorizedPerson: Person;

  //declare variables to hold username and password
  username: string = '';
  password: string = '';

  //progress spinner boolean
  isProgressSpinner: boolean = false;
  isCloseable: boolean = true;
  constructor(private router: Router, private loginService: LoginAPIService, 
    private data: DataService) {
    this.loginCreds = new LoginCreds();
    this.authorizedPerson = new Person();
  }

  ngOnInit(): void {
    //cleans the username and password field onInit
    this.subscription = this.data.authorizedPerson.subscribe(resp => this.authorizedPerson = resp)

    this.username= '';
    this.password = '';

    
    this.items = [
      {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => {
        this.router.navigate(['home'])
      }
      },
      { label: 'My Flights',
        icon: 'pi pi-send',
        command: () => {
          this.router.navigate(['my-flights'])
        } 
      },
      {
        label: 'Login',
        icon: 'pi pi-lock',
        command: () => { this.giveLoginDialogBox(); }
      },
      {
        label: this.getUsername(),
        icon: 'pi pi-user',
        items: [
          {
            label: 'Account Settings',
            icon: 'pi pi-cog',
            command: () => {
              
            }
          },
          {
          label: 'Sign Out',
          icon: 'pi pi-power-off',
          command: () => { 
            
            this.logout();
            this.isProgressSpinner = false;
          }
          }
          
        ]
      }];
  }

// METHODS 
  giveLoginDialogBox(): void {
    // alert('Logging in');
    this.showModalDialog();
    
    this.ngOnInit();
  }

  getUsername(): string {
    if (this.authorizedPerson == new Person()) {//If the user hasn't logged in...
      return "Not Signed In";
    } else {
      return `Hello ${this.authorizedPerson.firstName} ${this.authorizedPerson.lastName}`
    }
  }

  logout(): void {
    // alert('Logging out');

    this.authorizedPerson = new Person();
    this.displayModal = false;
    this.isUserLoggedOut = true;
    this.displayModal2 = true;
    setTimeout(() =>{
      this.ngOnInit();
      this.router.navigate(['home'])
      this.displayModal2 = false;
    }, 2000);
    
    //Router link to Home component.
  }

  // clickedLogout(): boolean {
    
  //   if (this.currentUser != undefined) {//If the user hasn't logged in...
  //     this.isUserLoggedOut = true;
  //     this.displayModal2 = true;
  //   }
  //   return this.isUserLoggedOut;
  // }

  clickedLogin(): boolean {
    this.isUserLoggedIn = true;//this.isUserLoggedIn = !this.isUserLoggedIn;
    // console.log(this.isUserLoggedIn);
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
    if((this.loginService.authenticateUser(this.loginCreds) != null)){
    
      this.isProgressSpinner = true;
      this.isCloseable = false;
      setTimeout(() =>{
        this.displayModal=false;
        this.clickedLogin();
        this.loginService.authenticateUser(this.loginCreds);
        this.saveDate();
        this.ngOnInit();
      }, 1000);
      
    }
    else{
      alert('Incorrect username or password')
    }
  }

  loginAuthenticated() {
    if(this.authorizedPerson != null){
      this.getUsername();
    }
  }

  saveDate() {
    this.data.getAuthorizedPerson(this.authorizedPerson);
  }




}
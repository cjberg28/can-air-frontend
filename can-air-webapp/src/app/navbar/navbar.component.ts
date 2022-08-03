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
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];
  
  isUserLoggedIn: boolean = false;
  displayModal: boolean = false;
  isUserLoggedOut: boolean = false;
  displayModal2: boolean = false;

  loginCreds: LoginCreds;
  subscription!: Subscription;
  
  authorizedPerson!: Person;

  testPerson: Person = new Person();

  incorrectCreds: boolean = false;

  //progress spinner boolean
  isProgressSpinner: boolean = false;
  isCloseable: boolean = true;
  
  constructor(private router: Router, private loginService: LoginAPIService, 
    private auth: UserAuthService) {
    this.loginCreds = new LoginCreds();
    
  }

  ngOnInit(): void {
    //get default authorizedPerson from user auth service
    this.auth.authorizedPerson.subscribe((resp: any) => {this.authorizedPerson = resp})
  

    
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
    
    this.showModalDialog();
    
    this.ngOnInit();
  }

  getUsername(): string {
    if (this.authorizedPerson.personId == 0 ) {//If the user hasn't logged in...
      return "Not Signed In";
    } else {
      return `Hello, ${this.authorizedPerson?.firstName} ${this.authorizedPerson?.lastName}`
    }
  }

  logout(): void {
    // alert('Logging out');

    
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

  clickedLogin(): boolean {
    this.isUserLoggedIn = true;//this.isUserLoggedIn = !this.isUserLoggedIn;
    
    return this.isUserLoggedIn;
  }

  showModalDialog(): void {
    if (this.authorizedPerson != null) {//If the user hasn't logged in...
      this.displayModal = true;
    }
  }

  login() {
    //on the backend, check if username and password match
    //if they do, return the full user
    //if they don't, return null
    //then check if null or not
    console.log(this.loginCreds)
    this.loginService.authenticateUser(this.loginCreds).subscribe((resp: any) => {
      console.log(resp); 
      console.log(resp != null)
      if(resp != null){
        this.authorizedPerson.personId = resp.personId;
        console.log(this.authorizedPerson.personId)
        this.authorizedPerson.firstName = resp.firstName;
        this.authorizedPerson.lastName = resp.lastName;
        this.authorizedPerson.phoneNumber = resp.phoneNumber;
        this.authorizedPerson.email = resp.email;
        this.authorizedPerson.dateOfBirth = resp.dateOfBirth;
      }
      
      if(this.authorizedPerson.personId != 0){
    
        this.isProgressSpinner = true;
        this.isCloseable = false;    
          
        this.sendAuthUser();  //update authorizedPerson in auth user service
        setTimeout(() =>{
          this.displayModal=false;
          this.clickedLogin();
  
          // console.log(this.authorizedPerson)
          this.ngOnInit();
        }, 1000);
        
      }
      else{
        this.incorrectCreds = true;
        this.isProgressSpinner = false;
        this.isCloseable = true;
        this.displayModal = true;
      }
    })
    
  }

  sendAuthUser() {
    this.auth.getAuthorizedPerson(this.authorizedPerson);
  }

  




}
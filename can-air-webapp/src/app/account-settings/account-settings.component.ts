import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Person } from '../models/Person';
import { User } from '../models/User';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  authorizedPerson: Person = new Person();
  user: User;
  subscription!: Subscription;
  stateOptions: Array<any>;
  value1: string = 'off'
  constructor(private auth: UserAuthService) {
    this.stateOptions = [{label: 'Off', value: 'off'}, {label: 'On', value: 'on'}];
    this.user = new User(0, 0, '', '')
   }

  
  
  ngOnInit(): void {
    this.subscription = this.auth.authorizedPerson.subscribe(resp => this.authorizedPerson = resp)
  }


  cancelUpdate() {
    this.ngOnInit();
  }

  confirmedUpdate() {
    this.ngOnInit()
  }

  changePassword(){

  }
  
  updateAccountInformation(){

  }

  sendUser(authorizedPerson: Person) {
    this.auth.getAuthorizedPerson(this.authorizedPerson)
  }
}

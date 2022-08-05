import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Person } from '../models/Person';
import { User } from '../models/User';
import { UserApiService } from '../user-api.service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
  providers: [MessageService]
})
export class AccountSettingsComponent implements OnInit {

  authorizedPerson: Person = new Person();
  user: User;
  subscription!: Subscription;
  stateOptions: Array<any>;
  newPurchase: string = 'on'
  refunds: string = 'off'
  accountUpdates: string = 'off'
  weeklyNewsletter: string = 'on'
  weeklyPromotions: string = 'on'
  carAndHotelPromotions: string = 'off'
  flightStatus: string = 'off'

  isAccountUpdateSuccessful: boolean;
  updateMessage: Message[] = [];

  constructor(private auth: UserAuthService, private userService: UserApiService) {
    this.stateOptions = [{label: 'Off', value: 'off'}, {label: 'On', value: 'on'}];
    this.user = new User(0, 0, '', '');
    this.isAccountUpdateSuccessful = false;
   }

  
  
  ngOnInit(): void {
    this.subscription = this.auth.authorizedPerson.subscribe(resp => this.authorizedPerson = resp);
    this.updateMessage = [
      {severity:'success', summary:'Success', detail:'Account Information Updated Successfully'},
      {severity:'info', summary:'Info', detail:'Message Content'},
    ]
  }


  cancelUpdate() {
    this.ngOnInit();
  }

  confirmedUpdate() {
    this.userService.updateUser(this.authorizedPerson).subscribe(resp => {
      if(resp == true){
        this.addSuccessMessage()
      }  
    });
    
    this.ngOnInit()
  }

  addSuccessMessage(): void {
    this.updateMessage = [
        {severity:'success', summary:'Success', detail:'Information updated!'},
      ];
    this.isAccountUpdateSuccessful = true;
    this.sendUser(this.authorizedPerson)
    }

  changePassword(){

  }
  
  updateAccountInformation(){

  }

  sendUser(authorizedPerson: Person) {
    this.auth.getAuthorizedPerson(authorizedPerson)
  }
}

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

  
  /** 
   * Initialize an authorized person by utilizing UserAuthService to get the updated data
   */
  ngOnInit(): void {
    this.subscription = this.auth.authorizedPerson.subscribe(resp => this.authorizedPerson = resp);
    this.updateMessage = [
      {severity:'success', summary:'Success', detail:'Account Information Updated Successfully'},
      {severity:'info', summary:'Info', detail:'Message Content'},
    ]
  }

  //may be unused
  cancelUpdate() {
    this.ngOnInit();
  }

  /**
   * This method is called when the user hits the Update Info button on the pop up modal
   * that has all the input fields.
   * It calls UserApiService's updateUser method
   * @returns void
   */
  confirmedUpdate(): void {
    this.userService.updateUser(this.authorizedPerson).subscribe(resp => {
      if(resp == true){
        this.addSuccessMessage()
      }  
    });
    
    this.ngOnInit()
  }

  /**
   * This method is called inside this.confirmedUpdate()
   * Adds success message to message array
   * Sets isAccountUpdateSuccessful variable to true which flips the ngIf to display the p-message
   * Sends updated authorized person out from component
   */
  addSuccessMessage(): void {
    this.updateMessage = [
        {severity:'success', summary:'Success', detail:'Information updated!'},
      ];
    this.isAccountUpdateSuccessful = true;
    this.sendUser(this.authorizedPerson)
    }
  
  /**
   * This method is called when the user hits Change Password button
   * It calls updatePassword method of UserApiService
   * It displays success message
   */
  changePassword(){

  }
  
  /**
   * 
   * @param authorizedPerson - the updated authorizedPerson object passed out from this component
   * after the user updates information
   */
  sendUser(authorizedPerson: Person) {
    this.auth.getAuthorizedPerson(authorizedPerson)
  }
}

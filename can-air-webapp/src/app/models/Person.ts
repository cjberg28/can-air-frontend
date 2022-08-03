import { pipe } from "rxjs";

export class Person {
    dateOfBirth: Date;
    email: string;
    firstName: string;
    lastName: string;
    personId: number;
    phoneNumber: string;
    
    

    constructor (dateOfBirth: Date = new Date(), email: string = '', id: number = 0, firstName: string = '', lastName: string = '',
    phoneNumber: string = '',  ){
        this.personId = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }
}
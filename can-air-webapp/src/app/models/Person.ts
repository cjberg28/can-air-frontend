import { pipe } from "rxjs";

export class Person {
    personId: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    DOB: Date;

    constructor (id: number = 0, fName: string = '', lName: string = '',
    phone: string = '', email: string = '', DOB: Date = new Date()){
        this.personId = id;
        this.firstName = fName;
        this.lastName = lName;
        this.phone = phone;
        this.email = email;
        this.DOB = DOB;
    }
}
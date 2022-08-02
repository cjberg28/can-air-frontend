export class TicketHolder {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    DOB: Date;

    constructor (fName: string = '', lName: string = '',
    phone: string = '', email: string = '', DOB: Date = new Date()){
        
        this.firstName = fName;
        this.lastName = lName;
        this.phone = phone;
        this.email = email;
        this.DOB = DOB;
    }
}
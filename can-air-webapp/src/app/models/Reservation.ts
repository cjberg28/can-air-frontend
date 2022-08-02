import { Time } from "@angular/common";

export class Reservation {
    reservationId: number;
    flightId: number;
    userId: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dob: Date;
    // ------------------------
    departureDate: Date;
    departureLocation: any;
    arrivalLocation: any;
    returnTrip: boolean;
    returnDate: Date;
    departureDepartureTime: Time = {hours: 10, minutes: 30};
    departureArrivalTime: Time = {hours: 12, minutes: 35};
    returnDepartureTime: any;
    returnArrivalTime: any;


    constructor(resId: number = 0, flId: number = 0, uId: number = 0,
        firstName: string = '', lastName: string = '', phone: string = '', email: string = 'abc@gmail.com',
        dob: Date = new Date(), depDate: Date = new Date(), depLoc: any = 0, arrLoc: any = 0, returnTrip: boolean = false,
        retDate: Date = new Date()){
        this.reservationId = resId;
        this.flightId = flId;
        this.userId = uId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.dob = dob;
        this.departureDate = depDate;
        this.returnTrip = returnTrip;
        this.returnDate = retDate;
    }
}
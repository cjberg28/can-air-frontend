import { Time } from "@angular/common";

export class Flight {
    flightNumber :number;
    departing: string;
    arriving: string;
    departureDate: Date;
    isRoundTrip: boolean;
    returnDate: Date;
    departureTime: string;
    arrivalTime: string;
    price: string;
    //date stuff
    


    constructor(
        flightNumber :number= 1000, 
        departing: string = '',
        arriving: string = '',
        departureDate: Date = new Date(),
        isRoundTrip: boolean = false,
        returnDate: Date = new Date(),
        departureTime: string = '09:00',
        arrivalTime: string = '13:00',
        price: string = '$420') 
        {
            let yesterday = new Date(returnDate);
            yesterday.setDate(yesterday.getDate()-1);

            this.flightNumber = flightNumber;
            this.departing = departing;
            this.arriving = arriving;
            this.departureDate = departureDate;
            this.isRoundTrip = isRoundTrip;
            this.returnDate = yesterday;
            this.departureTime = departureTime;
            this.arrivalTime = arrivalTime;
            this.price = price;
            

 

    }
}
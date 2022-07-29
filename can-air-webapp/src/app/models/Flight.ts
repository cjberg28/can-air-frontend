import { Time } from "@angular/common";

export class Flight {
    flightNumber :number;
    departing: string;
    arriving: string;
    departureDate: Date;
    isRoundTrip: boolean;
    returnDate: string;
    departureTime: string;
    arrivalTime: string;
    price: string;


    constructor(
        flightNumber :number= 1000, 
        departing: string = 'LAX',
        arriving: string = 'DTW',
        departureDate: Date = new Date('2022-12-31'),
        isRoundTrip: boolean = false,
        returnDate: string = '',
        departureTime: string = '09:00',
        arrivalTime: string = '13:00',
        price: string = '$420') 
        {
        this.flightNumber = flightNumber;
        this.departing = departing;
        this.arriving = arriving;
        this.departureDate = departureDate;
        this.isRoundTrip = isRoundTrip;
        this.returnDate = returnDate;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.price = price;

    }
}
import { Time } from "@angular/common";

export class Flight {
    flightId :number;
    departureLocation!: any;
    arrivalLocation!: any;
    departureDate: Date
    departureDepartureTime: Time;
    departureArrivalTime: Time;
    returnDate: Date;
    returnDepartureTime: Time;
    returnArrivalTime: Time
    flightPrice: string;
    seatsRemaining: number;
    roundTrip: boolean;

    
    //date stuff
    


    constructor(
        flightNumber :number= 1000, 
        departing: string = '',
        arriving: string = '',
        departureDate: Date = new Date(),
        isRoundTrip: boolean = false,
        returnDate: Date = new Date(),
        departureTime: Time = {hours: 9, minutes: 30 },
        arrivalTime: Time = {hours: 12, minutes: 0o0},
        returnDepartureTime: Time = {hours: 9, minutes: 30},
        returnArrivalTime: Time = {hours: 12, minutes: 0o0},
        seatsRemaining: number = 50,
        price: string = '$420') 
        {
            let yesterday = new Date(returnDate);
            yesterday.setDate(yesterday.getDate()-1);

            this.flightId = flightNumber;
            this.departureLocation = departing;
            this.arrivalLocation = arriving;
            this.departureDate = departureDate;
            this.roundTrip = isRoundTrip;
            this.returnDate = yesterday;
            this.departureDepartureTime = departureTime;
            this.departureArrivalTime = arrivalTime;

            this.returnDepartureTime = returnDepartureTime;
            this.returnArrivalTime = returnArrivalTime;
            this.seatsRemaining = seatsRemaining;
            this.flightPrice = price;
            

 

    }
}
import { Flight } from "./Flight";

export class ReturnedFlight {
    isSuccessful: boolean;
    flights: Array<Flight>;

    constructor(isSuccessful: boolean = true, flights: Array<Flight>){
        this.isSuccessful = isSuccessful;
        this.flights = flights;
    }
}
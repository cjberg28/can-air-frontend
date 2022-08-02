export class Reservation {
    reservationId: number;
    flightId: number;
    userId: number;

    constructor(resId: number = 0, flId: number = 0, uId: number = 0){
        this.reservationId = resId;
        this.flightId = flId;
        this.userId = uId
    }
}
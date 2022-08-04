export class SpecialReservation {
    
    flightId: number;
    userId: number;
    reservationFirstName: string;
    reservationLastName: string;
    reservationPhone: string;
    reservationEmail: string;
    reservationDateOfBirth: Date;
    user: {
        userId: number;
    };
    flight: {
        flightId: number;
    }

    constructor( flightId: number = 0, userId: number = 0,
        firstName: string = '', lastName: string = '', phone: string = '', email: string = '', dob: Date = new Date()) {

            
            this.flightId = flightId;
            this.userId = userId;
            this.reservationFirstName = firstName;
            this.reservationLastName = lastName;
            this.reservationPhone = phone;
            this.reservationEmail  = email;
            this.reservationDateOfBirth = dob;
            this.user = {userId: 0};
            this.flight = {flightId: 0};
    }
}
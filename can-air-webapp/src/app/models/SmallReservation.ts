export class SmallReservation {
    reservationId: number;
    flightId: number;
    userId: number;
    reservationFirstName: string;
    reservationLastName: string;
    reservationPhone: string;
    reservationEmail: string;
    reservationDateOfBirth: Date;

    constructor( resId: number = 0, flightId: number = 0, userId: number = 0,
        firstName: string = '', lastName: string = '', phone: string = '', email: string = '', dob: Date = new Date()) {

            this.reservationId = resId;
            this.flightId = flightId;
            this.userId = userId;
            this.reservationFirstName = firstName;
            this.reservationLastName = lastName;
            this.reservationPhone = phone;
            this.reservationEmail  = email;
            this.reservationDateOfBirth = dob;
    }
}
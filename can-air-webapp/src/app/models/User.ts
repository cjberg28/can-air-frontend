export class User {
    userId: number;
    personId: number;
    username :string;
    
    password: string;

    constructor(id: number = 0, personId = 0, name :string, pass: string = '') {
        this.username = name;
        this.userId = id;
        this.password = pass;
        this.personId = personId;
    }
}
export class User {
    username :string;
    userId: number;
    password: string;

    constructor(name :string, id: number = 0, pass: string = '') {
        this.username = name;
        this.userId = id;
        this.password = pass;
    }
}
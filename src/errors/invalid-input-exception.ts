export class InvalidInputException implements Error {
    public name     : string = 'InvalidInputException';
    public message  : string;

    constructor(message: string) {
        this.message = message;
    }
}

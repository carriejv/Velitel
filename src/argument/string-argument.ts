import { InvalidInputException } from "../errors/invalid-input-exception";
import { GenericArgument } from "./generic-argument";

/**
 * An argument which accepts a string.
 * @see IArgument
 */
export class StringArgument extends GenericArgument<string> {

    public arg: string;
    public name: string;
    public desc: string;
    public value: string;

    public regex:       RegExp;
    public minLength:   number;
    public maxLength:   number;

    constructor(arg: string) {
        super(arg);
    }

    /**
     * Sets the value if the value matches any criteria set on the argument.
     * @override
     * @param input The raw string input from the command.
     * @throws InvalidInputException if the input does not match any set criteria.
     */
    public parseValue(input: string): void {
        if (!this.regex.test(input)) {
            throw new InvalidInputException(
                `The input must match the following: ${this.regex}`,
            );
        }
        if (input.length < this.minLength) {
            throw new InvalidInputException(
                `The input must be longer than ${this.minLength} characters.`,
            );            
        }
        if (input.length > this.maxLength) {
            throw new InvalidInputException(
                `The input must be shorter than ${this.maxLength} characters.`,
            );            
        }
        this.value = input;
    }

    /**
     * Sets a regex that the input string must match.
     * @param regex The regex to match against.
     */
    public thatMatchesRegex(regex: RegExp): StringArgument {
        this.regex = regex;
        return this;
    }

    /**
     * Sets a minimum length for the string.
     * @param len The length.
     */
    public withMinLength(len: number): StringArgument {
        this.minLength = len;
        return this;
    }

    /**
     * Sets a maximum length for the string.
     * @param len The length.
     */
    public withMaxLength(len: number): StringArgument {
        this.maxLength = len;
        return this;
    }

}

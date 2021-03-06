import { InvalidInputException } from '../errors/invalid-input-exception';
import { GenericArgument } from './generic-argument';

/**
 * An argument which accepts one of a specific set of string values.
 * @see IArgument
 */
export class EnumArgument extends GenericArgument<string> {

    public arg      : string;
    public name     : string;
    public desc     : string;
    public value    : string;

    public acceptableValues     : string[];
    public caseSensitive        : boolean;

    constructor(arg: string) {
        super(arg);
        this.acceptableValues = [];
        this.caseSensitive = true;
    }

    /**
     * Sets the value if the value matches any acceptable value added with
     * withAcceptableValue().
     * @override
     * @param input The raw string input from the command.
     * @throws InvalidInputException if the input has not been added as an acceptable value.
     */
    public parseValue(input: string): void {
        if (!this.acceptableValues.includes(input)) {
            throw new InvalidInputException(
                `The input must be one of the following: ${this.acceptableValues.toString()}`,
            );
        }
        this.value = input;
    }

    /**
     * Adds a possible value to the enum.
     * @param value The value to add.
     */
    public withMember(value: string): EnumArgument {
        this.acceptableValues.push(this.caseSensitive ? value : value.toLowerCase());
        return this;
    }

    /**
     * Adds an array of possible values to the enum.
     * @param value The value to add.
     */
    public withMembers(values: string[]): EnumArgument {
        values.forEach( v => {
            this.withMember(v);
        });
        return this;
    }

    /**
     * Sets the enum to case-insensitive matching mode.
     */
    public withCaseInsensitiveMatching(): EnumArgument {
        this.acceptableValues.forEach( (v, k) => {
            this.acceptableValues[k] = v.toLowerCase();
        });
        this.caseSensitive = false;
        return this;
    }

}

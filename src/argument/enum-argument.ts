import { GenericArgument } from './generic-argument';

/**
 * An argument which excepts one of a specific set of string values.
 * @see IArgument
 */
export class EnumArgument extends GenericArgument<string> {

    arg:    string;
    name:   string
    desc:   string;
    value:  string;

    acceptableValues:   string[];
    caseSensitive:      boolean;

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
     * @returns True if the input is valid, else false.
     */
    public parseValue(input: string): boolean {
        if(this.acceptableValues.includes(input)) {
            this.value = input;
            return true;
        }
        return false;
    }

    /**
     * Adds a possible value to the enum.
     * @param value The value to add.
     */
    public withAcceptableValue(value: string): void {
        this.acceptableValues.push(this.caseSensitive ? value : value.toLowerCase());
    }

    /**
     * Sets the enum to case-insensitive matching mode.
     */
    public withCaseInsensitiveMatching(): void {
        this.acceptableValues.forEach( (v, k) => {
            this.acceptableValues[k] = v.toLowerCase();
        });
        this.caseSensitive = false;
    }

}
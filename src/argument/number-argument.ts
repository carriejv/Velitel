import { InvalidInputException } from '../errors/invalid-input-exception';
import { GenericArgument } from './generic-argument';

/**
 * An argument which accepts a number.
 * @see IArgument
 */
export class NumberArgument extends GenericArgument<number> {

    public arg      : string;
    public name     : string;
    public desc     : string;
    public value    : number;

    public min      : number;
    public max      : number;
    public div      : number;
    public round    : number;

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
        let pInput: number;
        try {
            pInput = parseFloat(input);
        } catch(err) {
            throw new InvalidInputException(
                err,
            );
        }
        if (pInput < this.min) {
            throw new InvalidInputException(
                `The input must be greater than ${this.min}.`,
            );
        }
        if (pInput > this.max) {
            throw new InvalidInputException(
                `The input must be less than ${this.max}.`,
            );
        }
        if (pInput % this.div !== 0) {
            throw new InvalidInputException(
                `The input must be divisible by ${this.div}.`,
            );
        }
        if(this.round) {
            pInput = parseFloat(pInput.toFixed(this.round));
        }
        this.value = pInput;
    }

    /**
     * Sets the number of decimal places to which to round the input.
     * May be passed 0 to round to a whole number.
     * @param round The number of decimal places.
     */
    public roundedTo(round: number): NumberArgument {
        this.round = round;
        return this;
    }

    /**
     * Sets a minimum value for the number.
     * @param min The minimum.
     */
    public withMin(min: number): NumberArgument {
        this.min = min;
        return this;
    }

    /**
     * Sets a maximum value for the number.
     * @param max The maximum.
     */
    public withMax(max: number): NumberArgument {
        this.max = max;
        return this;
    }

    /**
     * Sets a mrequirement that the number is evenly divisible.
     * @param div The divisor.
     */
    public thatIsEvenlyDivisible(div: number): NumberArgument {
        this.div = div;
        return this;
    }

}

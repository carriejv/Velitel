import { IArgument } from './i-argument';

/**
 * An extensible generic argument, which provided basic builder functions
 * but no value parsing logic.
 * @see IArgument
 */
export class GenericArgument<T> implements IArgument<T> {

    public arg      : string;
    public name     : string;
    public desc     : string;
    public value    : T;

    constructor(arg: string) {
        this.arg = arg;
    }

    public hasValue(): boolean {
        return (this.value !== undefined);
    }

    public parseValue(input: string): void {
        return;
    }

    public withName(name: string): GenericArgument<T> {
        this.name = name;
        return this;
    }

    public withDesc(desc: string): GenericArgument<T> {
        this.desc = desc;
        return this;
    }

    public withDefault(value: T): GenericArgument<T> {
        this.value = this.value || value;
        return this;
    }

}

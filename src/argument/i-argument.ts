/**
 * A generic argument for a command.
 */
export interface IArgument<T> {

    /** The short name of the argument. Must be unique within the parent command. */
    arg: string;

    /** The human-readable long name of the argument. */
    name: string

    /** A description of the argument, for auto-generated help. */
    desc: string;

    /** The parsed value, if any, of the argument. */
    value: T;

    /** 
     * Checks if the argument has a value.
     * @returns True if this.value is not undefined, else false.
     * */
    hasValue(): boolean;

    /** 
     * Parses a value of type T from raw string input and sets it as this.value.
     * @param input The raw string input from the command.
     * @returns True on a valid value, else false.
     */
    parseValue(input: string): boolean;

    /** 
     * Adds a human-readale name to the argument.
     * @param name The name to set.
     * @returns Itself, for chainable building.
     */
    withName(name: string): IArgument<T>;

    /** 
     * Adds a human-readale description to the argument.
     * @param desc The description to set.
     * @returns Itself, for chainable building.
     */
    withDesc(desc: string): IArgument<T>;
    
    /** 
     * Adds a default value to the argument.
     * @param value The default value to set.
     * @returns Itself, for chainable building.
     */
    withDefault(value: T): IArgument<T>;

}
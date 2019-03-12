export class GenericCommand {

    /** The command string used to trigger events and any aliases. */
    private cmd: string[];

    /** The user-friendly name for the command. */
    private name: string;

    private args: Map<string, string /*GenericArgument*/>;

}

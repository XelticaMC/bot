import { Client, Message } from "discord.js";

export type MBCommand = (args: string[], message: Message, client: Client) => string | Promise<string>;

export type MBCommandDefinition = { readonly name: string, readonly description: string, readonly command: MBCommand, hidden: boolean };

export function define(name: string, description: string, command: MBCommand, hidden = false): MBCommandDefinition {
    return {
        name, description,
        command,
        hidden,
    };
}
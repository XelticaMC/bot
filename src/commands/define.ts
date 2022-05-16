import { Client, GuildMember } from "discord.js";

export type CBCommand = (args: string[], user: GuildMember | null, client: Client) => string | Promise<string>;

export type CBCommandDefinition = { readonly name: string, readonly description: string, readonly command: CBCommand, hidden: boolean };

export function define(name: string, description: string, command: CBCommand, hidden = false): CBCommandDefinition {
    return {
        name, description,
        command,
        hidden,
    };
}
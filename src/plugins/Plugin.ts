import { Client, Message, MessageReaction, PartialUser, User } from "discord.js";

export interface Plugin {
    onMessage?: (msg: Message, cli: Client) => Promise<void>;
    onReactionAdded?: (reaction: MessageReaction, user: User | PartialUser, cli: Client) => Promise<void>;
    onReactionRemoved?: (reaction: MessageReaction, user: User | PartialUser, cli: Client) => Promise<void>;
};

export const define = (plugin: Plugin) => plugin;
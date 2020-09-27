import { Client, Message } from "discord.js";
import { define } from "./define";
import commands from ".";
import { getCommandPrefix } from "../misc/env";

export default define('help', '', (_args: string[], _msg: Message, _client: Client) => {
    const prefix = getCommandPrefix();
    const a = commands.filter(c => !c.hidden).map(c => `${prefix}${c.name}: ${c.description}`).join('\n');
    return a;
});
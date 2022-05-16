import { Client, Message } from "discord.js";
import { define } from "./define";

export default define('is-server-admin', 'サーバーの管理者であるかどうか返します', (_args: string[], msg: Message, cli: Client) => {
    return msg.guild && msg.guild.ownerId === msg.author.id ? 'yes' : 'no';
}, true);
import { Client, Message } from "discord.js";
import { define } from "./define";
import { isAdmin } from "../misc/isAdmin";

export default define('is-admin', 'Botの管理者であるかどうかを返します。', (_args: string[], msg: Message, cli: Client) => {
    return isAdmin(msg.author.id, msg.guild) ? 'yes' : 'no';
});



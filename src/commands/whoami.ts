import { Client, Message } from "discord.js";
import { define } from "./define";

export default define('whoami', 'コマンド主の情報を返します', (_args: string[], msg: Message, cli: Client) => {
    const you = msg.author;
    return `${you.username} ID:${you.id}
アカウント登録日: ${you.createdAt.toLocaleString()}`;
}, true);
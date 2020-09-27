import { Client, Message } from "discord.js";
import { define } from "./define";

export default define('echo', '引数をそのまま出力します', (_args: string[], _msg: Message, _client: Client) => {
    const res = _args.join(' ');
    return res;
});
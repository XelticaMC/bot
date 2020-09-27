import { Client, Message } from "discord.js";
import rndstr from "rndstr";
import { define } from "./define";

export default define('seed', 'シード値を適当に生成します。マイクラのシード値に悩んでいる場合お使いください', (_args: string[], _msg: Message, _client: Client) => {
    return rndstr('a-zA-Z0-9', 32);
});
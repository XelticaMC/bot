import { Client, Message } from "discord.js";
import { define } from "./define";

export default define('ping', 'pong を返すだけ', (_args: string[], _msg: Message, _client: Client) => 'pong');
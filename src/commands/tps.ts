import { Client, Message } from "discord.js";
import { define } from "./define";
import { isAdmin } from "../misc/isAdmin";
import fetch from 'node-fetch';

export default define('tps', 'XelticaMCのtpsを返します。', async (_args: string[], _msg: Message, _cli: Client) => {
    const res = await fetch('https://api.craft.xeltica.work/v1/server').then(r => r.json()).then(r => r.tps as string).catch(e => {
        console.error(e);
        return '取得失敗';
    });
    return res;
});



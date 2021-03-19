import { Client, Message } from "discord.js";
import { define } from "./define";
import { isAdmin } from "../misc/isAdmin";
import fetch from 'node-fetch';

type Player = {
    uuid: string;
    displayName: string;
};

export default define('players', 'XelticaMCの参加プレイヤー一覧を返します。', async (_args: string[], _msg: Message, _cli: Client) => {
    try {
        const res = await fetch('https://api.craft.xeltica.work/v1/players').then(r => r.json()).then(r => r as Player[]);
        return `総数: ${res.length}\n${res.map(r => r.displayName).join(', ')}`;
    } catch(e) {
        console.error(e);
        return '取得失敗';
    }
});



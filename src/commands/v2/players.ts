import { Command } from "./types/Command";

type Player = {
    uuid: string;
    displayName: string;
};

export const players: Command = {
    name: 'players',
    description: 'XelticaMCの参加プレイヤーリストを取得します。',
    async run(ctx) {
        try {
            const res = await fetch('https://api.craft.xeltica.work/v1/players').then(r => r.json()).then(r => r as Player[]);
            ctx.reply(`総数: ${res.length}\n${res.map(r => r.displayName).join(', ')}`);
        } catch(e) {
            console.error(e);
            ctx.error('取得失敗');
        }
    },
};
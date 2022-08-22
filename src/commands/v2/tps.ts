import { Command } from "./types/Command";

export const tps: Command = {
    name: 'tps',
    description: 'XelticaMCのtpsを返します。',
    async run(ctx) {
        try {
            const res = await fetch('https://api.craft.xeltica.work/v1/server').then(r => r.json()).then(r => r.tps as string);
            ctx.reply(res);
        } catch(e) {
            console.error(e);
            ctx.error('取得失敗');
        }
    },
};
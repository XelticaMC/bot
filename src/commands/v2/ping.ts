import { Command } from "./types/Command";

export const ping: Command = {
    name: 'ping',
    description: 'pong を返すだけ',
    async run(ctx) {
        await ctx.reply('pong');
    },
};
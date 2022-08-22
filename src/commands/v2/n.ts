import { Command } from "./types/Command";

export const n: Command = {
    name: 'n',
    description: '「いいえ」と言う',
    async run(ctx) {
        await ctx.reply('いいえ');
    },
};
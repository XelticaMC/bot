import { Command } from "./types/Command";

export const y: Command = {
    name: 'y',
    description: '「はい」と言う',
    async run(ctx) {
        await ctx.reply('はい');
    },
};
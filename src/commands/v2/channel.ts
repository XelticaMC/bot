import { DiscordAPIError, TextChannel } from "discord.js";
import { Command } from "./types/Command";

export const channel: Command = {
    name: 'channel',
    description: '指定したチャンネルの詳細情報を取得します。',
    isEphemeral: true,
    options: [
        {
            type: 'CHANNEL',
            name: 'channel',
            description: '詳細情報を取得したいチャンネル',
            required: true,
        }
    ],
    async run(ctx) {
        const {id} = ctx.command.options.getChannel('channel', true);
        const channel = await ctx.discord.channels.fetch(id);
        try {
            if (!(channel instanceof TextChannel)) {
                ctx.reply('Specify the text channel.');
            } else {
                ctx.reply(
                    `**${channel.name}**${channel.nsfw ? ' (NSFW)' : ''}
    ${channel.topic || 'トピックはありません'}

    作成日:${channel.createdAt.toLocaleString()}`
                );
            };
        } catch (e: unknown) {
            console.error(e);
            if (e instanceof DiscordAPIError) {
                ctx.error('存在しないチャンネルです。');
            } else if (e instanceof Error) {
                ctx.error(`未知のエラーです。\n技術情報: ${e.name} ${e.message}`);
            } else {
                ctx.error('未知のエラーです。');
            }
        }
    },
};
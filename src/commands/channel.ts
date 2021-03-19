import { Client, DiscordAPIError, Message, TextChannel } from "discord.js";
import { getCommandPrefix } from "../misc/env";
import { extractChannels } from "../misc/extract";
import { define } from "./define";

export default define('channel', '指定したチャンネルを情報を取得します。', async (args: string[], msg: Message, cli: Client) => {
    if (args.length !== 1) {
        return getCommandPrefix() + 'channel <channel>';
    }
    const id = extractChannels(args[0])[0];

    try {
        const ch = id ? await cli.channels.fetch(id) : null;
        if (!(ch instanceof TextChannel)) return 'Specify the text channel.';
        return `**${ch.name}**${ch.nsfw ? ' (NSFW)' : ''}\n${ch.topic || 'トピックはありません'}\n\n作成日:${ch.createdAt.toLocaleString()}`;
    } catch (e: unknown) {
        console.error(e);
        if (e instanceof DiscordAPIError) {
            return '存在しないチャンネルです。';
        } else if (e instanceof Error) {
            return `未知のエラーです。\n技術情報: ${e.name} ${e.message}`;
        } else {
            return '未知のエラーです。';
        }
    }
});
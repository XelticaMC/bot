import { Client, DiscordAPIError, GuildMember, TextChannel } from "discord.js";
import { define } from "./define";
import { extractChannels } from "../misc/extract";
import { fetchLastMessage } from "../misc/fetchLastMessage";

export default define('last-message-of', '', async (args: string[], member: GuildMember | null, cli: Client) => {
    if (args.length !== 1) {
        return '/channel <channel>';
    }
    const id = extractChannels(args[0])[0];

    try {
        const ch = id ? await cli.channels.fetch(id) : null;
        if (!(ch instanceof TextChannel)) return 'Specify the text channel.';

        const last = await fetchLastMessage(ch);
        return last ? `${last.author.username}: ${last.content}` : 'no message';
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
}, true);
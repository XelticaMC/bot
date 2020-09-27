import { TextChannel } from 'discord.js';

export async function fetchLastMessage(ch: TextChannel) {
    return (await ch.messages.fetch({ limit: 1 })).first();
}

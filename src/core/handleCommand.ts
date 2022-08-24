import { CommandInteraction } from 'discord.js';
import commands from '../commands/v2';
import { cli } from '../app';
import { replyError } from './replyError';

export async function handleCommand(it: CommandInteraction) {
    const command = commands.find(command => command.name === it.commandName);
    if (!command) {
        await it.reply(`${it.commandName} というコマンドはありません…。`);
        return;
    }
    const member = !it.member ? null : 'bannable' in it.member ? it.member : null;
    await it.deferReply({
        ephemeral: command.isEphemeral,
    });
    const res = command.run({
        discord: cli,
        command: it,
        member,
        async reply(text) {
            await it.editReply(text);
        },
        async error(text) {
            await replyError(it, text);
        },
    });

    // Promiseなら待機する
    if (typeof res === 'object') {
        await res;
    }
}

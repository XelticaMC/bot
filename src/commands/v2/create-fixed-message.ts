import { DiscordAPIError, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import { Command } from "./types/Command";
import content from '../../misc/tos';

export const createWelcomeMessage: Command = {
    name: 'create-fixed-message',
    description: 'このチャンネルの下部に、指定した文言を常に表示するよう設定します。',
    isStaffCommand: true,
    options: [{
        type: 'STRING',
        name: 'body',
        description: '表示する文言',
        required: true,
    }],
    async run({command, reply, error}) {
        const channel = command.channel;
        if (!channel) return error('チャンネルが見つかりませんでした。');
        
        await reply('WIP');
    },
};
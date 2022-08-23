import { DiscordAPIError, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import { Command } from "./types/Command";
import content from '../../misc/tos';
import { InteractionCustomId } from "../../misc/interaction-custom-id";

export const createWelcomeMessage: Command = {
    name: 'create-welcome-message',
    description: 'このチャンネルに、ようこそメッセージを作成します。',
    isStaffCommand: true,
    isEphemeral: true,
    async run({command, reply, error}) {
        const channel = command.channel;
        if (!channel) return error('チャンネルが見つかりませんでした。');
        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(InteractionCustomId.welcome)
                    .setLabel('OK')
                    .setEmoji('👍')
                    .setStyle('PRIMARY')
            );
        await channel.send({
            content,
            components: [button],
        });
        await reply('作成しました。');
    },
};
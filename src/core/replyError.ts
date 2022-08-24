import { ButtonInteraction, CommandInteraction, SelectMenuInteraction } from "discord.js";

export const replyError = (it: CommandInteraction | ButtonInteraction | SelectMenuInteraction, description: string) => {
    return it.editReply({
        embeds: [
            {
                color: 'RED',
                title: '😭 エラーです…',
                description,
            }
        ],
    });
};
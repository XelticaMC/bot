import { MessageActionRow, MessageButton } from "discord.js";
import { InteractionCustomId } from "../../misc/interaction-custom-id";
import { Command } from "./types/Command";

export const createMunicipalityBoard: Command = {
    name: 'create-municipality-board',
    description: 'このチャンネルに、自治体参加ボードを作成します。',
    isStaffCommand: true,
    isEphemeral: true,
    async run({command, reply, error}) {
        const channel = command.channel;
        if (!channel) return error('チャンネルが見つかりませんでした。');
        const link = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('自治体について詳しく')
                    .setURL('https://wiki.craft.xeltica.work/cities')
                    .setStyle('LINK')
            );
        const actions = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId(InteractionCustomId.municipality.add)
                    .setLabel('つける')
                    .setEmoji('➕')
                    .setStyle('SUCCESS')
            ).addComponents(
                new MessageButton()
                    .setCustomId(InteractionCustomId.municipality.remove)
                    .setLabel('はがす')
                    .setEmoji('➖')
                    .setStyle('DANGER')
            );
        await channel.send({
            embeds: [{
                title: '自治体ロールボード',
                description: '自治体チャンネルに参加するためには、同じ名前のロールを持つ必要があります。\nボタンを押して、必要なロールを手に入れましょう。',
            }],
            components: [link, actions],
        });
        await reply('作成しました。');
    },
};
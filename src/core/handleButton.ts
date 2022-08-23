import { ButtonInteraction } from 'discord.js';
import { getNotificationNewComerChannel } from '../misc/env';
import { getRole } from '../misc/getRole';
import { memberRole } from '../misc/roles';
import { welcomes } from '../misc/welcomes';
import { cli } from '../app';

export async function handleButton(it: ButtonInteraction) {
    console.info(`Handling Button ID: ${it.customId}`);
    if (it.customId === 'welcome') {
        await it.deferReply({ ephemeral: true });
        const guild = it.guild;
        if (!guild) {
            await it.editReply('エラー');
            return;
        }
        const crafterRole = await getRole(it.guild, memberRole);
        const roles = it.member?.roles;
        if (!crafterRole || !roles || !('cache' in roles)) {
            await it.editReply('エラー');
            return;
        };

        // ロールが既に付与済みであれば無視
        if (roles.cache.some(r => r.id === crafterRole.id)) {
            await it.editReply('あなたは既にクラフターです。');
            return;
        }

        roles.add(crafterRole)
            .then(async () => {
                const notificationChannel = getNotificationNewComerChannel();
                if (!notificationChannel) {
                    await it.editReply('エラー');
                    return;
                };
                const ch = await cli.channels.fetch(notificationChannel);
                if (!ch || !ch.isText()) {
                    await it.editReply('エラー');
                    return;
                }
                const mention = `<@${it.user.id}>`;
                await ch.send(welcomes[Math.floor(Math.random() * welcomes.length)].replace(/%s/g, mention));
                await it.editReply(`ロールを付与しました。\n<#${notificationChannel}>で挨拶しましょう。`);
            })
            .catch(async () => {
                await it.editReply('エラー');
            });
    }
}

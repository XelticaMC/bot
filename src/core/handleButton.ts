import { ButtonInteraction, InteractionCollector, MessageActionRow, MessageSelectMenu, Role, SelectMenuInteraction } from 'discord.js';
import { getNotificationNewComerChannel } from '../misc/env';
import { getRole } from '../misc/getRole';
import { memberRole } from '../misc/roles';
import { welcomes } from '../misc/welcomes';
import { cli } from '../app';
import { InteractionCustomId } from '../misc/interaction-custom-id';
import { prisma } from '../libs/prisma';
import rndstr from 'rndstr';
import { replyError } from './replyError';
import { sliceByNumber } from '../misc/sliceByNumber';

const municipalityAction = async (it: ButtonInteraction, mode: 'add' | 'remove') => {
    const verb = mode === 'add' ? 'つけ' : 'はがし';
    const guild = it.guild;
    const member = it.member;
    if (!guild || !member || !('id' in member)) {
        await it.editReply('未知のエラー');
        return;
    }
    await it.reply({
        content: '自治体情報を取得中…',
        ephemeral: true
    });
    const memberRoles = member.roles.cache.map(r => r.name);
    const fetched = await prisma.municipality.findMany({
        select: {
            name: true,
            emoji: true,
        }
    }).then(f => (
        f.filter(r => mode === 'add' ? !memberRoles.includes(r.name) : memberRoles.includes(r.name))
    )).catch(async () => {
        await replyError(it, '自治体情報の取得に失敗しました。');
    });
    if (!fetched) return;
    if (fetched.length === 0) {
        await it.editReply(mode === 'add' ? 'もうすべての自治体ロールを持っているみたいです。すごいです！' : '自治体ロールをまだ持っていないので、はがすものもないです。');
        return;
    }
    const names = fetched.map(m => m.name);
    const municipalityGroups = sliceByNumber(fetched, 25);
    const customIds = Array(municipalityGroups.length).fill(null).map(() => rndstr('a-zA-Z0-9', 64));
    const menu = municipalityGroups.map((ms, i) => (
        new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setPlaceholder(`自治体を選択…（ページ${i + 1}）`)
                .setCustomId(customIds[i])
                .setMinValues(1)
                .setMaxValues(ms.length)
                .addOptions(
                    ms.map(({name, emoji}) => ({
                        label: name,
                        value: name,
                        emoji,
                    }))
                )
        )
    ));
    await it.editReply({
        content: `${verb}たい自治体ロールをメニューから選んでください～。\n3分過ぎたらどっか行っちゃいますので、早めに済ませてね`,
        components: menu,
    });

    const collector = new InteractionCollector(cli, {
        filter: fit => fit.isSelectMenu() && customIds.includes(fit.customId),
        time: 3 * 60 * 1000,
    });

    collector.on('collect', async (cit: SelectMenuInteraction) => {
        // 謎の自治体が入ってたらエラーにする
        if (cit.values.some(name => !names.includes(name))) {
            await cit.reply('存在しない自治体を指定しましたね…？もう一回やり直してください');
            return;
        }
        const roles = cit.values.map(name => guild.roles.cache.find(r => r.name === name)) as Role[];
        await cit.reply({
            content: `ロールを${verb}ています…しばらくお待ちください。`,
            ephemeral: true,
        });
        await Promise.all(roles.map(role => mode === 'add' ? member.roles.add(role) : member.roles.remove(role)));
        await cit.editReply(`ロールを${verb}ました。`);
    });
};

const handlers: Record<string, (it: ButtonInteraction) => Promise<void>> = {
    async [InteractionCustomId.welcome](it) {
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
    },
    async [InteractionCustomId.municipality.add](it) {
        await municipalityAction(it, 'add');
    },
    async [InteractionCustomId.municipality.remove](it) {
        await municipalityAction(it, 'remove');
    },
};

export async function handleButton(it: ButtonInteraction) {
    const handler = handlers[it.customId];
    if (!handler) {
        console.error(`Unknown button interaction ID: ${it.customId}`);
        return;
    }
    await handler(it);
}

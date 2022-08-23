import { DiscordAPIError, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import { Command } from "./types/Command";
import content from '../../misc/tos';
import { getRole } from "../../misc/getRole";
import { prisma } from "../../libs/prisma";

export const registerMunicipality: Command = {
    name: 'register-municipality',
    description: '自治体を登録します。',
    isStaffCommand: true,
    options: [{
        type: 'STRING',
        name: 'name',
        description: '自治体名',
        required: true,
    }, {
        type: 'STRING',
        name: 'emoji',
        description: '自治体を表す絵文字',
        required: true,
    }, {
        type: 'USER',
        name: 'mayor',
        description: '自治体代表者',
        required: true,
    }, {
        type: 'BOOLEAN',
        name: 'no_channel',
        description: 'チャンネルやロールを作成しないかどうか',
    }],
    async run({command, reply, error}) {
        const channel = command.channel;
        if (!channel) return error('チャンネルが見つかりませんでした。');
        const guild = command.guild;
        if (!guild) return error('謎のエラー');

        const name = command.options.getString('name', true);
        const emoji = command.options.getString('emoji', true);
        const mayor = command.options.getUser('mayor', true);
        const noChannel = command.options.getBoolean('no_channel', false) ?? false;

        await reply('データベースに登録中…');

        await prisma.municipality.create({
            data: {
                name, emoji,
            },
        });

        if (!noChannel) {
            const mayorMember = command.guild?.members.resolve(mayor.id);
            if (!mayorMember) return error('代表者が実在しないようですが…。');

            const mayorRole = guild.roles.cache.get('869934499272724530');
            if (!mayorRole) return error('「自治体代表者」ロールが見つからないようです。つまり、作れということですよ');

            const soumuRole = guild.roles.cache.get('991957604374941706');
            if (!soumuRole) return error('エラー');
            const keibiRole = guild.roles.cache.get('991957703930953758');
            if (!keibiRole) return error('エラー');
            const jichitaiKanriRole = guild.roles.cache.get('991958247902818355');
            if (!jichitaiKanriRole) return error('エラー');

            const category = guild.channels.resolve('867666650530709504');
            if (!category || category.type !== 'GUILD_CATEGORY') {
                return error('自治体カテゴリが見つかりません…。');
            }
            
            await reply('自治体ロールを作成中…');
            // 自治体ロールを作成
            const municipalityRole = await guild.roles.create({
                name,
                mentionable: true,
            });

            await reply('自治体チャンネルを作成中…');
            await guild.channels.create(`${emoji}｜${name}`, {
                type: 'GUILD_TEXT',
                parent: category,
                topic: `代表者：${mayor.username}#${mayor.discriminator}`,
                permissionOverwrites: [{
                    id: guild.id,
                    deny: ['VIEW_CHANNEL'],
                }, {
                    id: municipalityRole.id,
                    allow: ['VIEW_CHANNEL'],
                }, {
                    id: soumuRole.id,
                    allow: ['VIEW_CHANNEL'],
                }, {
                    id: keibiRole.id,
                    allow: ['VIEW_CHANNEL'],
                }, {
                    id: jichitaiKanriRole.id,
                    allow: ['VIEW_CHANNEL'],
                }, ],
            });
            
            await reply('代表者にロールを付与中…');
            await mayorMember?.roles.add(municipalityRole);
            await mayorMember?.roles.add(mayorRole);
        }
        
        await reply('自治体のセットアップが終わりました！');
    },
};

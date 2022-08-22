/*
 * XelticaMC Bot ENTRY POINT
*/

import { ApplicationCommandDataResolvable, Client, Intents, IntentsString } from 'discord.js';

import { plugins } from './plugins';
import { getBotToken, getTosChannel } from './misc/env';
import commands from './commands/v2';

if (!getBotToken()) {
    console.error('BOT_TOKEN が未定義です。.env ファイルに記載してください');
    process.exit(-1);
}

if (!getTosChannel()) {
    console.error('TOS_CHANNEL が未定義です。.env ファイルに記載してください');
    process.exit(-1);
}

if (!getTosChannel()) {
    console.error('TOS_CHANNEL が未定義です。.env ファイルに記載してください');
    process.exit(-1);
}

console.log(`XelticaMC Bot`);
console.log(`loaded ${plugins.length} plugins`);
console.log(`loaded ${commands.length} commands`);

const cli = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    // TODO: パフォーマンス向上のため、インテントを厳選する
    intents: Object.keys(Intents.FLAGS) as IntentsString[],
});

cli.on('ready', async () => {
    const app = cli.application;
    if (!app) {
        console.error('App not found');
        process.exit(1);
    }

    console.log(`${cli.user?.username ?? 'NULL'} というアカウントでログインしました。`);

    // スラッシュコマンド登録
    const slashCommands = commands.map(c => ({
        name: c.name,
        description: c.description || '説明なし',
        defaultPermission: !c.isStaffCommand,
        options: c.options,
        type: 'CHAT_INPUT',
    } as ApplicationCommandDataResolvable));

    await app.commands.set(slashCommands, '759661786105905152');
});

cli.on('messageCreate', msg => {
    if (msg.author.id === cli.user?.id) return;
    Promise.all(plugins.map(async plugin => {
        if (plugin.onMessage)
            await plugin.onMessage(msg, cli);
    }));
});

cli.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
        await reaction.fetch();
    }
    if (user.id === cli.user?.id) return;
    await Promise.all(plugins.map(async plugin => {
        if (plugin.onReactionAdded)
            plugin.onReactionAdded(reaction, user, cli);
    }));
});

cli.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.partial) {
        await reaction.fetch();
    }
    if (user.id === cli.user?.id) return;
    await Promise.all(plugins.map(async plugin => {
        if (plugin.onReactionRemoved)
            plugin.onReactionRemoved(reaction, user, cli);
    }));
});

// スラッシュコマンドの処理
cli.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = commands.find(command => command.name === interaction.commandName);
    if (!command) {
        interaction.reply(`${interaction.commandName} というコマンドはありません…。`);
        return;
    }
    await interaction.deferReply();
    const member = !interaction.member ? null : 'bannable' in interaction.member ? interaction.member : null;
    const res = command.run({
        discord: cli,
        command: interaction,
        member,
        async reply(text) {
            await interaction.editReply(text);
        },
        async error(text) {
            await interaction.editReply({
                embeds: [
                    {
                        color: 'RED',
                        title: '😭 エラーです…',
                        description: text,
                    }
                ]
            });
        },
    });

    // Promiseなら待機する
    if (typeof res === 'object') {
        await res;
    }
});

// ボタンの処理
cli.on('interactionCreate', async interaction => {
    
});

cli.login(getBotToken());
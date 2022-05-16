/*
 * XelticaMC Bot ENTRY POINT
*/

import { ApplicationCommandDataResolvable, Client, GuildMember, Intents, IntentsString } from 'discord.js';

import { plugins } from './plugins';
import { getAdmins, getBotToken, getTosChannel } from './misc/env';
import commands from './commands';

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
console.log("ｼｭｰｰｰ...");
console.log(`loaded ${plugins.length} plugins`);
console.log(`loaded ${commands.length} commands`);

const cli = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    // TODO: パフォーマンス向上のため、インテントを厳選する
    intents: Object.keys(Intents.FLAGS) as IntentsString[],
});

cli.on('ready', async () => {
    console.log(`${cli.user?.username ?? 'NULL'} というアカウントでログインしました。`);

    console.log('admin Id: ');
    for (const id of getAdmins()) {
        console.log(' ' + id);
    }

    // スラッシュコマンド登録
    const slashCommands = commands.map(c => ({
        name: c.name,
        description: c.description || '説明なし',
        defaultPermission: !c.hidden,
        type: 'CHAT_INPUT',
    } as ApplicationCommandDataResolvable));

    await cli.application?.commands.set(slashCommands, '759661786105905152');
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
    const res = command.command([], member, cli);
    const res2 = typeof res === 'string' ? res : await res;
    await interaction.editReply(res2);
});

cli.login(getBotToken());
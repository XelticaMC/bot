/*
 * XelticaMC Bot ENTRY POINT
*/

import { Client, Intents, IntentsString } from 'discord.js';

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

cli.login(getBotToken());
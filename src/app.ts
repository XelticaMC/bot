/*
 * MaruyamaBot ENTRY POINT
*/

import { Client } from 'discord.js';
import { plugins } from './plugins';
import workers from './workers';
import dotenv from 'dotenv';
import { getAdmins, getBotToken, getTosChannel } from './misc/env';

import meta from '../package.json';
import commands from './commands';

dotenv.config();

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

console.log(`Creeper Bot v${meta.version}`);
console.log("起動中...");
console.log(`loaded ${plugins.length} message handlers`);
console.log(`loaded ${commands.length} commands`);
console.log(`loaded ${workers.length} workers`);

const cli = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

cli.on('ready', async () => {
    console.log(`${cli.user?.username ?? 'NULL'} というアカウントでログインしました。`);

    console.log('admin Id: ');
    for (const id of getAdmins()) {
        console.log(' ' + id);
    }
});

cli.on('message', msg => {
    Promise.all(plugins.map(async plugin => {
        if (plugin.onMessage)
            await plugin.onMessage(msg, cli);
    }));
});

cli.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
        await reaction.fetch();
    }
    await Promise.all(plugins.map(async plugin => {
        if (plugin.onReactionAdded)
            plugin.onReactionAdded(reaction, user, cli);
    }));
});

cli.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.partial) {
        await reaction.fetch();
    }
    await Promise.all(plugins.map(async plugin => {
        if (plugin.onReactionRemoved)
            plugin.onReactionRemoved(reaction, user, cli);
    }));
});

setInterval(() => {
    workers.forEach(worker => worker(cli));
}, 1000);

cli.login(getBotToken());
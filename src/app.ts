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
    console.error('SIRITORI_CHANNEL が未定義です。.env ファイルに記載してください');
    process.exit(-1);
}

console.log(`Creeper Bot v${meta.version}`);
console.log("起動中...");
console.log(`loaded ${plugins.length} message handlers`);
console.log(`loaded ${commands.length} commands`);
console.log(`loaded ${workers.length} workers`);

const cli = new Client();

cli.on('ready', async () => {
    console.log(`${cli.user?.username ?? 'NULL'} というアカウントでログインしました。`);

    console.log('admin Id: ');
    for (const id of getAdmins()) {
        console.log(' ' + id);
    }
});

cli.on('message', msg => {
    plugins.forEach(plugin => {
        if (plugin.onMessage)
            plugin.onMessage(msg, cli);
    });
});

cli.on('messageReactionAdd', (reaction, user) => {
    plugins.forEach(plugin => {
        if (plugin.onReaction)
            plugin.onReaction(reaction, user, cli);
    });
});

setInterval(() => {
    workers.forEach(worker => worker(cli));
}, 1000);

cli.login(getBotToken());
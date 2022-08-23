/*
 * XelticaMC Bot ENTRY POINT
*/

import { ApplicationCommandDataResolvable, Client, Intents, IntentsString } from 'discord.js';

import { plugins } from './plugins';
import { getBotToken, getTosChannel } from './misc/env';
import commands from './commands/v2';
import { prisma } from './libs/prisma';
import { handleCommand } from './core/handleCommand';
import { handleButton } from './core/handleButton';

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

console.log(`XelticaMC Bot version ${process.env.npm_package_version}`);
console.log(`${plugins.length} プラグインを読み込みました。`);
console.log(`${commands.length} コマンドを読み込みました。`);

export const cli = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    // TODO: パフォーマンス向上のため、インテントを厳選する
    intents: Object.keys(Intents.FLAGS) as IntentsString[],
});

prisma.$connect().then(async () => {
    console.log('DB 接続が確立されました。');

    if ((await prisma.miscData.count()) === 0) {
        await prisma.miscData.create({
            data: {
                up_at: new Date(),
                bump_at: new Date(),
            },
        });
    }

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
    
    cli.on('interactionCreate', async interaction => {
        console.log(`Handling interaction: ${interaction.id} as ${interaction.type}`);
        if (interaction.isCommand()) {
            handleCommand(interaction);
        } else if (interaction.isButton()) {
            handleButton(interaction);
        }
    });
    
    cli.login(getBotToken());

    process.on('uncaughtException', e => {
        console.error(`Unexpected exception: ${e.name} ${e.message}\n${e.stack}`);
    });
});

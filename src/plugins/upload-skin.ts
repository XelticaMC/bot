/* 
 * スキンアップロードプラグイン
 */

import fs from 'fs';
import stream from 'stream';
import path from 'path';
import fetch from 'node-fetch';

import { Client, Message } from "discord.js";

import { getSkinChannel, getSkinDestination } from "../misc/env";
import { define } from "./Plugin";

export default define({
    async onMessage(msg: Message, cli: Client): Promise<void> {
        if (msg.channel.id === getSkinChannel() && msg.author.id !== cli.user?.id) {
            const attachments = msg.attachments.mapValues(f => f).array();
            if (attachments.length !== 1) {
                msg.reply('画像ファイルを1枚だけ上げてください...!');
                return;
            }
            const {
                width, height, url, id, 
            } = attachments[0];

            if (width === null || height === null) {
                msg.reply('画像サイズが取得できませんでした。ほんとに画像ですか...?');
                return;
            }

            if (width !== 64 || ![32, 64].includes(height)) {
                msg.reply(`サイズが非対応のようです。\nマイクラは64x64, 64x32の画像のみスキンとして使えます。この画像のサイズは${width}x${height}みたいです。`);
                return;
            }

            const baseUrl = getSkinDestination()!;
            const dest = path.join(baseUrl, `${id}.png`);
            const res = await fetch(url);
            const output = fs.createWriteStream(dest);

            res.body.pipe(output);
            res.body.on("error", (err) => {
                output.close();
                msg.reply(`保存に失敗しました。`);
                return;
            });
            output.on("finish", function () {
                output.close();
                msg.reply(`保存しました。次のコマンドを実行すると、スキンを適用できます！\n\`\`\`\n/skin url http://skins.craft.xeltica.work/${id}.png\n\`\`\``);
                return;
            });
        }
    },
});
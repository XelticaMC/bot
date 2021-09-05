/* 
 * スキンアップロードプラグイン
 */

import fs from 'fs';
import probe from 'probe-image-size';
import path from 'path';
import fetch from 'node-fetch';
import { v4 as uuid } from 'uuid';

import { Client, Message, MessageAttachment } from "discord.js";

import { getSkinChannel, getSkinDestination } from "../misc/env";
import { define } from "./Plugin";

type Data = {
    url: string;
    width: number;
    height: number;
};

const getImageFromDiscord = async ({ url, width, height }: MessageAttachment): Promise<Data> => {
    if (width === null || height === null) throw new Error('画像サイズが取得できませんでした。ほんとに画像ですか...?');
    return { url, width, height };
}

const getImageFromSkinseedShortUrl = async (url: string): Promise<Data> => {
    const finalUrl = await fetch(url).then(r => r.url);
    return getImageFromSkinseed(finalUrl);
}

const getImageFromSkinseed = async (url: string): Promise<Data> => {
    const skinseedUrl = 'https://skinseedapp.com/share/';
    const s3url = 'https://s3.amazonaws.com/skinseed/share/';
    const newUrl = s3url + url.slice(skinseedUrl.length) + '.png';
    const probed = await probe(newUrl);
    return {
        url: newUrl,
        width: probed.width,
        height: probed.height,
    };
}

export default define({
    async onMessage(msg: Message, cli: Client): Promise<void> {
        if (msg.channel.id === getSkinChannel() && msg.author.id !== cli.user?.id) {
            const attachments = msg.attachments.mapValues(f => f).array();
            const text = msg.content.trim();
            
            try {
                const data: Data | null = attachments.length > 0 ? (
                    await getImageFromDiscord(attachments[0])
                ) : text.startsWith('https://is.gd/') ? (
                    await getImageFromSkinseedShortUrl(text)
                ) : text.startsWith('https://skinseedapp.com/share/') ? (
                    await getImageFromSkinseed(text)
                ) : null;

                if (data === null) {
                    await msg.delete();
                    const m = await msg.reply(`不正な投稿です。本チャンネルは次の投稿にのみ対応しています。
・Minecraftスキン画像のアップロード
・SkinSeed形式URLの書き込み(短縮URLもOK)`);
                    setTimeout(() => m.delete(), 5000);
                    return;
                }

                const {
                    width,
                    height,
                    url,
                } = data;

                const id = uuid();

                if (width !== 64 || ![32, 64].includes(height)) {
                    let message = `本サーバーで使用できるスキン画像は64x64, 64x32のみです。`;
                    if (width === 128 && height === 128) {
                        message = '統合版サーバーではないため、128サイズのテクスチャ―は使用できません。';
                    }
                    msg.reply(`画像サイズ（${width}x${height}）は適切ではありません。\n${message}`);
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
                output.on("finish", async function () {
                    output.close();
                    await msg.reply(`保存しました。次のコマンドを実行すると、スキンを適用できます！`);
                    await msg.channel.send(`/skin url http://skins.craft.xeltica.work/${id}.png`);
                    return;
                });
            } catch (e) {
                msg.reply(e.message);
                console.error(e);
                return;
            }
        }
    },
});
import { Client, Message } from "discord.js";
import { define } from "./define";
import fetch from 'node-fetch';
import { getCommandPrefix } from "../misc/env";
import { ChunithmSongDataNormal, ChunithmSongDataRaw, convertAll, convertLevel, convertLevelToString as formatLevel } from "../types/chunithm";

const songs: ChunithmSongDataNormal[] = [];

const desc = `チュウニズムの楽曲を選曲します。
記法: ${getCommandPrefix()}chunithm [クエリ]

クエリはキーと値を:で区切ったものです。クエリは複数指定することで複雑に絞り込めます。

キー:
  **min** 指定したレベル以上
  **max** 指定したレベル以下
  **lv** 指定したレベルと完全に一致
  **name** 指定した名前と部分一致
  **len** 抽出数。デフォルトは3;
`;

export default define('chunithm', desc, async (args: string[], _msg: Message, _cli: Client) => {
    let minLevel: number | null = null;
    let maxLevel: number | null = null;
    let level: number | null = null;
    let name: string | null = null;
    let length = 3;
    for (const q of args) {
        const [key, val] = q.split(':');
        switch (key.toLowerCase()) {
            case 'min':
                minLevel = convertLevel(val);
                break;
            case 'max':
                maxLevel = convertLevel(val);
                break;
            case 'lv':
            case 'level':
                level = convertLevel(val);
                break;
            case 'name':
                name = val;
                break;
            case 'len':
            case 'length':
                length = parseInt(val);
                break;
        }
    };
    if (songs.length === 0) {
        const raw = await fetch('https://chunithm.sega.jp/data/common.json').then(r => r.json()).then(r => r as ChunithmSongDataRaw[]);
        songs.push(...(convertAll(raw).filter(d => d.category !== 'WORLD\'S END') as ChunithmSongDataNormal[]));
    }
    let temp = songs;

    if (level !== null) {
        // 完全一致のフィルター
        const l = level;
        temp = temp.filter(t => t.basicLevel === l || t.advancedLevel === l || t.expertLevel === l || t.masterLevel === l);
    } else {
        if (maxLevel !== null) {
            const m = maxLevel;
            temp = temp.filter(t => t.basicLevel <= m || t.advancedLevel <= m || t.expertLevel <= m || t.masterLevel <= m);
        }
        if (minLevel !== null) {
            const m = minLevel;
            temp = temp.filter(t => t.basicLevel <= m || t.advancedLevel <= m || t.expertLevel <= m || t.masterLevel <= m);
        }
    }
    if (name !== null) {
        const n = name;
        temp = temp.filter(t => t.title.includes(n));
    }
    const picked = [];
    for (let i = 0; i < length && temp.length > 0; i++) {
        const [data] = temp.splice(Math.floor(Math.random() * temp.length), 1);
        picked.push(data);
    }
    if (picked.length > 0) {
        return '選曲しました。\n' + picked
            .map(p => `**${p.category}** ${p.title} - ${p.artist}
B${formatLevel(p.basicLevel)} A${formatLevel(p.advancedLevel)} E${formatLevel(p.expertLevel)} M${formatLevel(p.masterLevel)}
`).join('\n');
    } else {
        return '選曲に失敗しました。対象の楽曲が見つかりません。';
    }
});



import { Client, Message } from "discord.js";
import { define } from "./define";
import commands from ".";
import { getCommandPrefix } from "../misc/env";

const helpMeReply = [
    '自分で何とかしろ',
    'どうしたん',
    '大丈夫？爆破する？^^',
    'とりあえず一発爆ぜとく？ｗ',
    'shhhhh... 🤯',
    '爆破は救済ですよ',
    'リフォームしますか？',
];

export default define('help', '', (args: string[], _msg: Message, _client: Client) => {
    const [arg] = args;
    if (arg === 'me') {
        return helpMeReply[Math.floor(Math.random() * helpMeReply.length)];
    } else if (arg) {
        const c = commands.find(c => c.name === arg && !c.hidden);
        return !c ? 'コマンドが見つかりませんでした。' : `**コマンド名: ${c.name}**
${c?.description}`;
    } else {
        const prefix = getCommandPrefix();
        const a = commands.filter(c => !c.hidden).map(c => `${prefix}${c.name}: ${c.description}`).join('\n');
        return a;
    }
});
import { Client, Message, TextChannel } from "discord.js";
import { getRoleChannel, getTosChannel } from "../misc/env";
import { fetchAllMessages } from "../misc/fetchAllMessages";
import { isAdmin } from "../misc/isAdmin";
import { roles } from "../misc/roles";
import { define } from "./define";

export default define('update-role-wizard', 'Update Role Wizard (for admin only)', async (_args: string[], msg: Message, cli: Client) => {
    if (!msg.guild) return 'use in guild';
    if (!isAdmin(msg.author.id, msg.guild)) return 'permission denied';
    const chid = getRoleChannel();
    if (!chid) return '';
    const ch = await cli.channels.fetch(chid);
    if (!(ch instanceof TextChannel)) return 'err';
    await Promise.all((await fetchAllMessages(ch)).map(mes => mes.delete()));
    const m = await ch.send(`村へようこそ。リアクションボタンを押すことで、お好きなロールを付与します。
自分の能力を表すためにご活用ください。

${roles.map(r => ` ${r.emoji} ${r.name}: ${r.description}`).join('\n')}`);

    roles.forEach(r => m.react(r.emoji));
    return 'ok';
}, true);
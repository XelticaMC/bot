import { Client, Message, TextChannel } from "discord.js";
import { getClubChannel, getRoleChannel, getTosChannel } from "../misc/env";
import { fetchAllMessages } from "../misc/fetchAllMessages";
import { isAdmin } from "../misc/isAdmin";
import { clubs } from "../misc/clubs";
import { define } from "./define";

export default define('update-club-wizard', 'Update Club Wizard (for admin only)', async (_args: string[], msg: Message, cli: Client) => {
    if (!msg.guild) return 'use in guild';
    if (!isAdmin(msg.author.id, msg.guild)) return 'permission denied';
    const chid = getClubChannel();
    if (!chid) return '';
    const ch = await cli.channels.fetch(chid);
    if (!(ch instanceof TextChannel)) return 'err';
    await Promise.all((await fetchAllMessages(ch)).map(mes => mes.delete()));
    const m = await ch.send(`リアクションボタンを押すことで好きな部活に入部できます。退部する際はリアクションを外します。

${clubs.map(r => ` ${r.emoji} ${r.name}: ${r.description}`).join('\n')}`);
    clubs.forEach(r => m.react(r.snowflake ?? r.emoji));
    return 'ok';
}, true);
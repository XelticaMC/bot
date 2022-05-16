import { Client, GuildMember, Message, TextChannel } from "discord.js";
import { getRoleChannel, getTosChannel } from "../misc/env";
import { fetchAllMessages } from "../misc/fetchAllMessages";
import { isAdmin } from "../misc/isAdmin";
import tos from "../misc/tos";
import { define } from "./define";

export default define('update-tos', 'Update TOS (for admin only)', async (_args: string[], member: GuildMember | null, cli: Client) => {
    if (!member) return 'use in guild';
    if (!isAdmin(member.user.id, member.guild)) return 'permission denied';
    const chid = getTosChannel();
    if (!chid) return '';
    const ch = await cli.channels.fetch(chid);
    if (!(ch instanceof TextChannel)) return 'err';
    await Promise.all((await fetchAllMessages(ch)).map(mes => mes.delete()));
    const m = await ch.send(tos);
    m.react('👍');
    return 'ok';
}, true);
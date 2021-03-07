import { Client, Message, TextChannel } from "discord.js";
import { getRoleChannel, getTosMcserverChannel } from "../misc/env";
import { fetchAllMessages } from "../misc/fetchAllMessages";
import { getRole } from "../misc/getRole";
import { isAdmin } from "../misc/isAdmin";
import { memberRole } from "../misc/roles";
import tos from "../misc/tos";
import { define } from "./define";

export default define('update-tos-mcserver', 'Update TOS of Minectaft Server (for admin only)', async (_args: string[], msg: Message, cli: Client) => {
    if (!msg.guild) return 'use in guild';
    if (!isAdmin(msg.author.id, msg.guild)) return 'permission denied';
    const chid = getTosMcserverChannel();
    if (!chid) return '';
    const ch = await cli.channels.fetch(chid);
    if (!(ch instanceof TextChannel)) return 'err';
    await Promise.all((await fetchAllMessages(ch)).map(mes => mes.delete()));
    const m = await ch.send(tos);
    m.react('👍');
    const role = await getRole(msg.guild, memberRole);
    role?.members.map(m => m.roles.remove(role));
    return 'ok';
}, true);
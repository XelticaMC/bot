import { GuildMember } from "discord.js";
import { define } from "./define";

export default define('is-server-admin', 'サーバーの管理者であるかどうか返します', (_args: string[], member: GuildMember | null) => {
    return member && member.guild.ownerId === member.id ? 'yes' : 'no';
}, true);
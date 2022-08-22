import { GuildMember } from "discord.js";
import { define } from "./define";
import { isAdmin } from "../misc/isAdmin";

export default define('is-admin', 'Botの管理者であるかどうかを返します。', (_args: string[], member: GuildMember | null) => {
    return member && isAdmin(member.id, member.guild) ? 'yes' : 'no';
}, true);

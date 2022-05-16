import { GuildMember } from "discord.js";
import { define } from "./define";

export default define('whoami', 'コマンド主の情報を返します', (_args: string[], member: GuildMember | null) => {
    if (!member) return "ERROR";
    return `${member.user.username} ID:${member.user.id}
アカウント登録日: ${member.user.createdAt.toLocaleString()}`;
});
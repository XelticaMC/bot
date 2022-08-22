import { Guild } from "discord.js";

export function isAdmin(userId: string, guild: Guild | null | undefined = null) {
    if (!guild) return false;
    const members = Array.from(guild.roles.cache.get('総務グループ')?.members.values() ?? []);
    return [guild.ownerId, ...members.map(m => m.id)].includes(userId);
}

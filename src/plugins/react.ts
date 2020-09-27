import { Client, GuildMember, MessageReaction, PartialUser, User } from "discord.js";
import { getRoleChannel, getTosChannel } from "../misc/env";
import { getRole } from "../misc/getRole";
import { memberRole, roles } from "../misc/roles";
import { define } from "./Plugin";

export default define({
    async onReactionAdded(reaction: MessageReaction, user: User | PartialUser, cli: Client) {
        // TOS
        if (reaction.message.channel.id === getTosChannel() && user.id !== cli.user?.id) {
            if (reaction.emoji.toString() === '👍') {
                if (!reaction.message.guild) return;
                const role = await getRole(reaction.message.guild, memberRole);
                if (!role) {
                    console.warn('no such role');
                    return;
                }
                const member = await reaction.message.guild?.members.fetch(user as User);
                member?.roles.add(role);
            }
        }

        // Role Channel
        if (reaction.message.channel.id === getRoleChannel() && user.id !== cli.user?.id) {
            if (!reaction.message.guild) return;

            const r = roles.find(r => r.emoji === reaction.emoji.toString());
            if (!r) return;

            const role = await getRole(reaction.message.guild, r);
            if (!role) return;

            const member = await reaction.message.guild?.members.fetch(user as User);
            member?.roles.add(role);
        }
    },

    async onReactionRemoved(reaction: MessageReaction, user: User | PartialUser, cli: Client) {
        // Role Channel
        if (reaction.message.channel.id === getRoleChannel() && user.id !== cli.user?.id) {
            if (!reaction.message.guild) return;

            const r = roles.find(r => r.emoji === reaction.emoji.toString());
            if (!r) return;

            const role = await getRole(reaction.message.guild, r);
            if (!role) return;

            const member = await reaction.message.guild?.members.fetch(user as User);
            member?.roles.remove(role);
        }
    },
});
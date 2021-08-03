/* リアクションプラグイン
 * リアクションを処理するプラグインです
 */

import { Client, MessageReaction, PartialUser, User } from "discord.js";
import { getTosChannel, getTosMcserverChannel } from "../misc/env";
import { getRole } from "../misc/getRole";
import { citizenRole, memberRole } from "../misc/roles";
import { define } from "./Plugin";

export default define({
    async onReactionAdded(reaction: MessageReaction, user: User | PartialUser, cli: Client) {
        // 規約への同意
        if (reaction.message.channel.id === getTosChannel() && user.id !== cli.user?.id) {
            if (reaction.emoji.toString() === '👍') {
                // サーバーでなければ無視
                if (!reaction.message.guild) return;

                // 
                const role = await getRole(reaction.message.guild, memberRole);
                if (!role) {
                    console.warn('The member role doesn\'t exist on your server!');
                    return;
                }
                const member = await reaction.message.guild?.members.fetch(user as User);
                member?.roles.add(role)
                    .then((m) => console.info(`Added ${m.displayName} as a member.`))
                    .catch((e) => console.error(`Failed to make ${member.displayName} as a member because of ${e.name ?? 'Error'}: ${e.message ?? 'unknown'}.`));
            }
        }

        if (reaction.message.channel.id === getTosMcserverChannel() && user.id !== cli.user?.id) {
            if (reaction.emoji.toString() === '👍') {
                // サーバーでなければ無視
                if (!reaction.message.guild) return;

                const role = await getRole(reaction.message.guild, citizenRole);
                if (!role) {
                    console.warn('The citizen role doesn\'t exist on your server!');
                    return;
                }
                const member = await reaction.message.guild?.members.fetch(user as User);
                member?.roles.add(role)
                    .then((m) => console.info(`Made ${m.displayName} as a citizen.`))
                    .catch((e) => console.error(`Failed to make ${member.displayName} as a citizen because of ${e.name ?? 'Error'}: ${e.message ?? 'unknown'}.`));
            }
        }
    },
});
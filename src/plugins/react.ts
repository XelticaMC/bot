/* リアクションプラグイン
 * リアクションを処理するプラグインです
 */

import { Client, MessageReaction, PartialMessageReaction, PartialUser, User } from "discord.js";
import { getNotificationNewComerChannel, getTosChannel, getTosMcserverChannel } from "../misc/env";
import { getRole } from "../misc/getRole";
import { memberRole } from "../misc/roles";
import { welcomes } from "../misc/welcomes";
import { define } from "./Plugin";

export default define({
    async onReactionAdded(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser, cli: Client) {
        // 規約への同意
        if (reaction.message.channel.id === getTosChannel() && user.id !== cli.user?.id) {
            if (reaction.emoji.toString() === '👍') {
                if (!reaction.message.guild) {
                    // サーバーでなければ無視
                    console.warn('The member tried to get the Crafter role from outside of the server. It seems to be a BUG!');
                    return;
                }

                const role = await getRole(reaction.message.guild, memberRole);
                if (!role) {
                    // ロールがサーバーに存在しなければ無視
                    console.warn('The member role doesn\'t exist on your server. Ignored.');
                    return;
                }

                const member = await reaction.message.guild?.members.fetch(user as User);
                if (member?.roles.cache.some(r => r.id === role.id)) {
                    // ロールが既に付与済みであれば無視
                    console.info(`The member ${member.displayName} tried to get the Crafter role, but already have it. Ignored.`);
                    return;
                }
                member?.roles.add(role)
                    .then(async (m) => {
                        const notificationChannel = getNotificationNewComerChannel();
                        if (!notificationChannel) return;
                        const ch = await cli.channels.fetch(notificationChannel);
                        if (!ch || !ch.isText()) return;
                        const mention = `<@${member.user.id}>`;
                        await ch.send(welcomes[Math.floor(Math.random() * welcomes.length)].replace(/%s/g, mention));
                        console.info(`Make ${m.displayName} a member.`);
                    })
                    .catch((e) => console.error(`Failed to make ${member.displayName} as a member because of ${e.name ?? 'Error'}: ${e.message ?? 'unknown'}.`));
            }
        }
    },
});
/* リアクションプラグイン
 * リアクションを処理するプラグインです
 * TODO: 規約プラグインとロールプラグインに分ける
 */

import { Client, MessageReaction, PartialUser, User } from "discord.js";
import { getRoleChannel, getTosChannel } from "../misc/env";
import { getRole } from "../misc/getRole";
import { memberRole, roles } from "../misc/roles";
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

        if (reaction.message.channel.id === getRoleChannel() && user.id !== cli.user?.id) {
             // サーバーでなければ無視
            if (!reaction.message.guild) return;

            // リアクションに対応するロール定義を取得。ロールに対応しないリアクションは無視
            const r = roles.find(r => r.emoji === reaction.emoji.toString());
            if (!r) return;

            // 定義に対応するサーバー内のロールを取得。無い場合は警告する
            const role = await getRole(reaction.message.guild, r);
            if (!role) {
                console.warn(`Role ${r.name} doesn't exist on your server!`);
                return;
            };

            // リアクションの送り主にロールを付与する
            const member = await reaction.message.guild?.members.fetch(user as User);
            member?.roles.add(role)
                .then((m) => console.info(`Gave ${m.displayName} a role "${r.name}".`))
                .catch((e) => console.error(`Failed to give ${member.displayName} as role "${r.name}" because of ${e.name ?? 'Error'}: ${e.message ?? 'unknown'}.`));
        }
    },

    async onReactionRemoved(reaction: MessageReaction, user: User | PartialUser, cli: Client) {
        // ロール剥奪
        if (reaction.message.channel.id === getRoleChannel() && user.id !== cli.user?.id) {
            // サーバーでなければ無視
            if (!reaction.message.guild) return;

            // リアクションに対応するロール定義を取得。ロールに対応しないリアクションは無視
            const r = roles.find(r => r.emoji === reaction.emoji.toString());
            if (!r) return;

            // 定義に対応するサーバー内のロールを取得。無い場合は警告する
            const role = await getRole(reaction.message.guild, r);
            if (!role) {
                console.warn(`Role ${r.name} doesn't exist on your server!`);
                return;
            };

            // リアクションの送り主からロールを剥奪する
            const member = await reaction.message.guild?.members.fetch(user as User);
            member?.roles.remove(role)
                .then((m) => console.info(`Took ${m.displayName} a role "${r.name}".`))
                .catch((e) => console.error(`Failed to take ${member.displayName} a role "${r.name}" because of ${e.name ?? 'Error'}: ${e.message ?? 'unknown'}.`));
        }
    },
});
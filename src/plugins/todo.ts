/* todoプラグイン
 * 開発者のtodo チャンネルに👍と👎のリアクションを自動付与
 * voteができる
 */

import { getTodoChannel } from "../misc/env";
import { define } from "./Plugin";

export default define({
    async onMessage(msg, cli) {
        const channelId = msg.channel.id;
        const todoChannelId = getTodoChannel();
        if (channelId !== todoChannelId) return;
        await msg.react('👍');
        await msg.react('👎');
    },
});
/* ディスクフル監視
 * コンソールを監視して、ディスクフルエラーが出ていれば報告する
 */

import { Client, Message, TextChannel } from "discord.js";
import { getConsoleChannel, getGameChatChannel } from "../misc/env";
import { define } from "./Plugin";

const textToDetect = 'デバイスに空き領域がありません';
const alertMessage = '<@!569815048436973588> ディスクパンパンやぞ起きろアホ';

export default define({
    onMessage: async (msg: Message, cli: Client) => {
        const gameChatId = getGameChatChannel();
        if (!gameChatId) return;

        if (msg.content.includes(textToDetect) && msg.channel.id === getConsoleChannel()) {
            const ch = await cli.channels.fetch(gameChatId);
            if (!(ch instanceof TextChannel)) return;

            const m = await ch.send(alertMessage);
        }
    },
});
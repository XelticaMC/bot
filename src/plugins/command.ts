/* コマンドプラグイン
 * コマンドを処理するプラグインです
 * コマンドは src/commands/index.ts に定義されています
 */

import { Client, Message } from "discord.js";
import { getCommand } from "../commands";
import { define } from "./Plugin";

export default define({
    async onMessage(msg: Message, cli: Client): Promise<void> {
        const prefix = process.env.COMMAND_PREFIX ?? '!!';
        const text = msg.content;
        const ch = msg.channel;
        if (text.startsWith(prefix)) {
            const args = text.substring(prefix.length).split(' ');
            const name = args.shift()?.toLowerCase();
            if (!name) return;

            const cmd = getCommand(name);
            if (!cmd) {
                console.warn(`${name} というコマンドは登録されていません。無視します。`);
                return;
            };

            try {
                const result = cmd.command(args, msg, cli);
                const content = typeof result === 'string' ? result : await result;
                ch.send({ content });
            } catch (e) {
                console.error(e);
                ch.send({ content: 'エラー'});
            }
        }
    },
});
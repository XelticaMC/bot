import rndstr from "rndstr";
import { Command } from "./types/Command";

export const seed: Command = {
    name: 'seed',
    description: 'シード値を適当に生成します。マイクラのシード値に悩んでいる場合お使いください',
    async run(ctx) {
        await ctx.reply(rndstr('a-zA-Z0-9', 32));
    },
};
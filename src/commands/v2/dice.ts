import { Command } from "./types/Command";

export const dice: Command = {
    name: 'dice',
    description: 'ダイスをロールできるコマンド',
    options: [
        {
            type: 'STRING',
            name: 'format',
            description: 'ダイスロール書式文字列。1d6みたいに',
            required: true,
        }
    ],
    async run(ctx) {
        function error() {
            ctx.error('構文が間違っています。\ns1d6 2d10 などのようにダイスロール書式文字列を指定してください。');
        }

        const format = ctx.command.options.getString('format', true);
        const [ count, max ] = format.split('d');
        const c = parseInt(count);
        const m = parseInt(max);
        const buffer: number[] = [];
        if (Number.isNaN(c) || Number.isNaN(m)) return error();
        if (c > 50) return error();
        if (m < 1) return error();
        for (let i = 0; i < c; i++) {
            buffer.push(Math.floor(Math.random() * m) + 1);
        }
        ctx.reply(buffer.join(' '));
    },
};
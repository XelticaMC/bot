import { getCommandPrefix } from "../misc/env";
import { define } from "./define";

export default define('dice', 'ダイスをロールできるコマンド', (args: string[]) => {
    function error() {
        return '構文エラー';
    }
    if (args.length !== 1) {
        return getCommandPrefix() + 'dice <count>d<max>';
    }
    const [ count, max ] = args[0].split('d');
    const c = parseInt(count);
    const m = parseInt(max);
    const buffer: number[] = [];
    if (Number.isNaN(c) || Number.isNaN(m)) return error();
    if (c > 50) return error();
    if (m < 1) return error();
    for (let i = 0; i < c; i++) {
        buffer.push(Math.floor(Math.random() * m) + 1);
    }
    return buffer.join(' ');
});
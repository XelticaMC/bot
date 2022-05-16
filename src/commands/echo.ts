import { define } from "./define";

export default define('echo', '引数をそのまま出力します', (args: string[]) => {
    const res = args.join(' ');
    return res;
});
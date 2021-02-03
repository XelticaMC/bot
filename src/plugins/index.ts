/* 読み込むプラグイン一覧
 * プラグインはすべてここに定義しています
 */

 import command from "./command";
import { Plugin } from "./Plugin";
import react from "./react";

export const plugins: Plugin[] = [
    command,
    react,
];
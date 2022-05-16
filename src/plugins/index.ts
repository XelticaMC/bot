/* 読み込むプラグイン一覧
 * プラグインはすべてここに定義しています
 */

import { Plugin } from "./Plugin";
import command from "./command";
import react from "./react";
import observeDiskFull from "./observe-disk-full";

export const plugins: Plugin[] = [
    command,
    react,
    observeDiskFull,
];

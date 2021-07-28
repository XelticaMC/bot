/* 読み込むプラグイン一覧
 * プラグインはすべてここに定義しています
 */

import { Plugin } from "./Plugin";
import command from "./command";
import uploadSkin from "./upload-skin";
import react from "./react";
import todo from "./todo";
import observeDiskFull from "./observe-disk-full";

export const plugins: Plugin[] = [
    command,
    react,
    uploadSkin,
    todo,
    observeDiskFull,
];
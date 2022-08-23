import { ApplicationCommandOptionData } from "discord.js";
import { CommandArgs } from "./CommandArgs";

/**
 * XelticaMC BOT コマンド定義。
 */
export interface Command {
  /** コマンド名 */
  name: string;
  /** コマンドの説明 */
  description?: string;
  /** スタッフ限定コマンドかどうか */
  isStaffCommand?: boolean;
  /** 実行結果を他ユーザーには表示しないかどうか */
  isEphemeral?: boolean;
  /** コマンドの引数 */
  options?: ApplicationCommandOptionData[];
  /** コマンド実行時の実際の処理 */
  run(args: CommandArgs): void | Promise<void>;
}

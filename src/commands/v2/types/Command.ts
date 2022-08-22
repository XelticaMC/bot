import { ApplicationCommandOptionData } from "discord.js";
import { CommandArgs } from "./CommandArgs";

/**
 * XelticaMC BOT コマンド定義。
 */

export interface Command {
  name: string;
  description?: string;
  isStaffCommand?: boolean;
  options?: ApplicationCommandOptionData[];
  run(args: CommandArgs): void | Promise<void>;
}

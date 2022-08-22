import { Client, CommandInteraction, GuildMember } from "discord.js";

/**
 * コマンド実行時に渡される引数。
 */

export interface CommandArgs {
  discord: Client;
  member: GuildMember | null;
  command: CommandInteraction;
  reply: (text: string) => Promise<void>;
  error: (text: string) => Promise<void>;
}

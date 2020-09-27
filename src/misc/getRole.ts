import { Guild } from "discord.js";
import { RoleDefinition } from "./roles";

export const getRole = async (guild: Guild, role: RoleDefinition) => guild.roles.cache.find(r => r.name === role.name);
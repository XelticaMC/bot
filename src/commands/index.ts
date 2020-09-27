import channel from "./channel";
import { MBCommandDefinition } from "./define";
import echo from "./echo";
import help from "./help";
import isAdmin from "./is-admin";
import isServerAdmin from "./is-server-admin";
import lastMessageOf from "./last-message-of";
import ping from "./ping";
import seed from "./seed";
import updateRoleWizard from "./update-role-wizard";
import updateTos from "./update-tos";
import whoami from "./whoami";

const commands: readonly MBCommandDefinition[] = [
    ping,
    help,
    echo,
    isAdmin,
    isServerAdmin,
    whoami,
    channel,
    lastMessageOf,
    updateTos,
    updateRoleWizard,
    seed,
];

export const getCommand = (name: string) => commands.find(c => c.name === name);

export default commands;
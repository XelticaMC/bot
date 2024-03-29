import channel from "./channel";
import { CBCommandDefinition } from "./define";
import echo from "./echo";
import help from "./help";
import isAdmin from "./is-admin";
import isServerAdmin from "./is-server-admin";
import lastMessageOf from "./last-message-of";
import ping from "./ping";
import players from "./players";
import seed from "./seed";
import tps from "./tps";
import updateTos from "./update-tos";
import whoami from "./whoami";
import y from "./y";
import n from "./n";
import dice from "./dice";

const commands: readonly CBCommandDefinition[] = [
    ping,
    help,
    echo,
    isAdmin,
    isServerAdmin,
    whoami,
    channel,
    lastMessageOf,
    updateTos,
    seed,
    players,
    tps,
    y,
    n,
    dice,
];

export const getCommand = (name: string) => commands.find(c => c.name === name);

export default commands;
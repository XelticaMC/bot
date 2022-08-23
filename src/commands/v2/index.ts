import { channel } from "./channel";
import { createMunicipalityBoard } from "./create-municipality-board";
import { createWelcomeMessage } from "./create-welcome-message";
import { dice } from "./dice";
import { listMunicipalities } from "./list-municipalities";
import { n } from "./n";
import { ping } from "./ping";
import { players } from "./players";
import { registerMunicipality } from "./register-municipality";
import { seed } from "./seed";
import { tps } from "./tps";
import { Command } from "./types/Command";
import { y } from "./y";

export default [
    channel,
    createWelcomeMessage,
    createMunicipalityBoard,
    dice,
    listMunicipalities,
    n,
    ping,
    players,
    registerMunicipality,
    seed,
    tps,
    y,
] as Command[];

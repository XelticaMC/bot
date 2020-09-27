import dayjs from 'dayjs';
import { Client, PresenceData } from 'discord.js';

let lastChanged = dayjs.unix(0);

const playing = (): PresenceData['activity'] => ({
    type: 'PLAYING',
    name: 'Minecraft',
    url: 'https://minecraft.net/',
});

export default async (cli: Client): Promise<void> => {
    const now = dayjs();
    if (now.diff(lastChanged, 'hour') >= 1) {
        cli.user?.setPresence({
            status: 'online',
            activity: playing(),
        });
        lastChanged = now;
    }
};
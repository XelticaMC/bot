import { prisma } from "../../libs/prisma";
import { Command } from "./types/Command";

export const listMunicipalities: Command = {
    name: 'list-municipalities',
    description: '自治体をリストアップします。',
    async run(ctx) {
      const municipalities = await prisma.municipality.findMany({
        select: {
          emoji: true,
          name: true,
        },
      });
      await ctx.reply(municipalities.map(m => `${m.emoji}｜**${m.name}**`).join('\n'));
    },
};

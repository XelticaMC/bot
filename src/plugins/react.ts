import { Client, MessageReaction, PartialUser, User } from "discord.js";
import { getTosChannel } from "../misc/env";
import { define } from "./Plugin";

export default define({
    async onReaction(reaction: MessageReaction, user: User | PartialUser, cli: Client) {
        if (reaction.message.channel.id === getTosChannel()) {
            reaction.message.channel.send({ content: reaction.emoji });
        }
    }
});
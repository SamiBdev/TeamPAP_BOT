import { Client, Events } from 'discord.js';
import { BotEvent } from "../types";

// Define a new event
const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        console.log(`Connecté en tant que ${client.user.tag}`);
    }
}

export default event;
import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { BotEvent } from '../types';

module.exports = (client: Client) => {
    let eventsDir = join(__dirname, '../events');

    // Loop through all files in the events directory
    readdirSync(eventsDir).forEach(file => {
        // If the file is not a JavaScript file, skip it
        if (!file.endsWith('.js')) return;
        
        // Load the event file and get the event data
        const event: BotEvent = require(`${eventsDir}/${file}`).default;

        // Add the event listener to the client based on whether it is a one-time event or not
        event.once
        ? client.once(event.name, (...args) => event.execute(...args))
        : client.on(event.name, (...args) => event.execute(...args));

        console.log(`Evenement ${event.name} correctement chargé`);
    });
}
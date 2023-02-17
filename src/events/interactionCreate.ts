import { Events, Interaction } from 'discord.js';
import { BotEvent } from "../types";

// Define a new event
const event: BotEvent = {
    name: Events.InteractionCreate, 
    once: false,
    async execute(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;
        // Get the command object for the interaction
        const command = interaction.client.slashCommands.get(interaction.commandName);

        if(!command) return; // If the command does not exist, return

        // Execute the command's code with the interaction as argument
        await command.execute(interaction);
    }
}

// Export the event object as default export
export default event;
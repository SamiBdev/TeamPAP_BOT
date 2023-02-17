import { Collection, Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { readdirSync } from 'fs';
import { join } from 'path';
import { SlashCommand } from './types';

// Load environment variables from a .env file
dotenv.config();

// Create a new Discord client instance with specified intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Create a new collection to hold slash commands
client.slashCommands = new Collection<string, SlashCommand>();

// Get the path to the 'handlers' directory
const handlersDirs = join(__dirname, "./handlers");

// Load each file in the 'handlers' directory
readdirSync(handlersDirs).forEach(file => {
    // Require and run each file with the client as an argument
    require(`${handlersDirs}/${file}`)(client);
});

// Log in to Discord using the provided bot token
client.login(process.env.TOKEN);
import { Client, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { SlashCommand } from '../types';

module.exports = async (client: Client) => {
    const body = []; // initialize an empty array to store the JSON data for each command
    let slashCommandsDir = join(__dirname, '../slashCommands'); // specify the directory where the slash commands are located

    // loop through all the files in the directory
    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith('.js')) return; // skip files that don't end with '.js'

        // require the command file and retrieve the command object
        const command: SlashCommand = require(`${slashCommandsDir}/${file}`).command;

        body.push(command.data.toJSON());
        // add the command to the client's collection of slash commands
        client.slashCommands.set(command.name, command);
    });
    
    // create a new REST client and set the token to the client's token
    const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

    try {
        // use the REST client to put the slash commands to the discord API
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: body });
    } catch (error) {
        console.error(error);
    }
}
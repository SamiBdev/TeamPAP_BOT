import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

export const command: SlashCommand = {
    name: 'ping',
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Affiche le ping du bot'),
    execute: async (interaction) => {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({name: 'Todakouma'})
                    .setDescription(`Pong!\nPing: ${interaction.client.ws.ping}`)
                    .setColor(`#ff8e4d`)
            ]
        })
    }
}
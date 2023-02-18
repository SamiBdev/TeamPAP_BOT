import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

// Definition of the command object
export const command: SlashCommand = {
    name: 'rouletterusse',
    // Data for the command (name and description)
    data: new SlashCommandBuilder()
    .setName('rouletterusse')
    .setDescription("Effectue une roulette russe et kick du vocal une personne au hazard"),
    // Code to be executed when the command is called
    execute: async (interaction) => {

        const voiceStates = interaction.guild?.voiceStates.cache;
        if (!voiceStates) {
          await interaction.reply("Personne n'est connecté au canal vocal !");
        }
      
        const members = voiceStates.filter((voiceState) => Boolean(voiceState.member)).map((voiceState) => voiceState.member);
        const randomNumber = Math.floor(Math.random() * (members.length - 0 + 1)) + 0;
        const kickMember = members[randomNumber];
        if (members.length === 0) {
          await interaction.reply("Personne n'est connecté au canal vocal !");
        }else if (kickMember.voice) {
            kickMember.voice.disconnect();
            await interaction.reply(`${kickMember.displayName} a été déconnecté !`);
        }else{
            await interaction.reply(`${kickMember.displayName} n'est pas connecté à un canal vocal.`);
        }    
    }
}


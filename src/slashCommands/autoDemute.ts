import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";
import { getAutoDemute, setAutoDemute, getcoolDownAutoDemute, setcoolDownAutoDemute, coolDownAutoDemuteTime } from '../utils/globals';

// Definition of the command object
export const command: SlashCommand = {
    name: 'autodemute',
    // Data for the command (name and description)
    data: new SlashCommandBuilder()
    .setName('autodemute')
    .setDescription("Active/Désactive l'auto demute"),
    // Code to be executed when the command is called
    execute: async (interaction) => {
        const timestamp: Date = new Date(); // Get the current date
        // Check if the auto demute feature is already active
        if (getAutoDemute()) {
            // If it's active, check if the cooldown time has passed
            const verifTimestamp = getcoolDownAutoDemute();
            if(timestamp.getTime() > verifTimestamp){
                // If the cooldown time has passed, disable the auto demute feature
                setAutoDemute(false);
                console.log("AutoDemute désactivé");
                await interaction.reply({ content: "l'auto démute a été désactivé !", fetchReply: true });
            }else{
                // If the cooldown time hasn't passed yet, inform the user of the remaining cooldown time
                const coolDownDate = new Date(verifTimestamp);
                await interaction.reply({ content: `Coold down de ${coolDownAutoDemuteTime} secondes, réessayé à ${formatDate(coolDownDate)}`, fetchReply: true });
            }
        // If the auto demute feature is not active, enable it
        } else {
            setAutoDemute(true);
            console.log("AutoDemute activé");
            await interaction.reply({ content: "l'auto démute a été activé !", fetchReply: true });
        }
        // Set the new cooldown time
        setcoolDownAutoDemute(timestamp.getTime()+(coolDownAutoDemuteTime*1000));
        
    }
}

// Format a date object into a string in the format "hh:mm:ss"
function formatDate(date:Date):String{
    const hour = ('0'+date.getHours()).slice(-2)
    const minute = ('0'+date.getMinutes()).slice(-2)
    const second = ('0'+date.getSeconds()).slice(-2)
    return hour+":"+minute+":"+second
}
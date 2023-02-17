import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";
import { getAutoDemute, setAutoDemute, getcoolDownAutoDemute, setcoolDownAutoDemute, coolDownAutoDemuteTime } from '../utils/globals';

export const command: SlashCommand = {
    name: 'autodemute',
    data: new SlashCommandBuilder()
    .setName('autodemute')
    .setDescription("Active/Désactive l'auto demute"),
    execute: async (interaction) => {
        const timestamp: Date = new Date();
        if (getAutoDemute()) {
            const verifTimestamp = getcoolDownAutoDemute();
            if(timestamp.getTime() > verifTimestamp){
                setAutoDemute(false);
                console.log("AutoDemute désactivé");
                await interaction.reply({ content: "l'auto démute a été désactivé !", fetchReply: true });
            }else{
                const coolDownDate = new Date(verifTimestamp);
                await interaction.reply({ content: `Coold down de ${coolDownAutoDemuteTime} secondes, réessayé à ${formatDate(coolDownDate)}`, fetchReply: true });
            }
            
        } else {
            setAutoDemute(true);
            console.log("AutoDemute activé");
            await interaction.reply({ content: "l'auto démute a été activé !", fetchReply: true });
        }
        setcoolDownAutoDemute(timestamp.getTime()+(coolDownAutoDemuteTime*1000));
        
    }
}


function formatDate(date:Date):String{
    const hour = ('0'+date.getHours()).slice(-2)
    const minute = ('0'+date.getMinutes()).slice(-2)
    const second = ('0'+date.getSeconds()).slice(-2)
    return hour+":"+minute+":"+second
}
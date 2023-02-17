import { Events, VoiceState } from 'discord.js';
import { BotEvent } from "../types";
import { getAutoDemute } from '../utils/globals';

// This event will be executed every time there is an update in the voice state
const event: BotEvent = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(oldState: VoiceState, newState: VoiceState) {
        // If auto-demute is not enabled, return immediately
        if (!getAutoDemute()) return;

        const member = newState.member;

        if (!member) return;

        // Check if the mute or deaf status was changed from unmuted/undeafened to muted/deafened
        const wasMuted = oldState.serverMute;
        const isMuted = newState.serverMute;
        const wasDeafened = oldState.serverDeaf;
        const isDeafened = newState.serverDeaf;

        if (!wasMuted && isMuted || !wasDeafened && isDeafened) {
            console.log(`${member.user.tag} a été rendu muet/casque par un administrateur.`);
            await newState.setMute(false);
            await newState.setDeaf(false);
            console.log(`${member.user.tag} a été démuté.`);
        }
        
    }
}

export default event;
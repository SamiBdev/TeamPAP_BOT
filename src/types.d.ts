import { Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_ID: string,
            TOKEN: string
        }
    }
}

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
    }
}

export interface BotEvent {
    name: string, // The name of the event we want to listen to
    once?: boolean | false, // Whether the event should only be executed once or not
    execute: (...args) => void // The code to execute when the event is triggered
}

export interface SlashCommand {
    name: string,
    data: SlashCommandBuilder | any,
    async execute: (interaction: CommandInteraction) => Promise<void>
}

export {}
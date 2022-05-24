import { Interaction, CommandInteractionOptionResolver } from "discord.js";
import { Event } from "../interfaces";
import { ExtendedInteraction } from "../interfaces/Command";

export const event: Event = {
    name: 'interactionCreate',
    run: async (client, interaction: Interaction) => {
        if( interaction.isCommand()) {
            await interaction.deferReply();
            const command = client.commands.get(interaction.commandName);
            if(!command) {
                return interaction.reply('Esse comando não existe');
            }

            command.run({
                args: interaction.options as CommandInteractionOptionResolver,
                client,
                interaction: interaction as ExtendedInteraction,
            });
        }
    },
}
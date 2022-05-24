import { Command } from "../../interfaces";

export const slash: Command = {
    name: 'ping',
    description: 'Calcula o ping do bot.',
    testOnly: false,
    run: ({interaction}:any) => {
        return interaction.followUp({content: `O ping do bot é de estimados ${interaction.client.ws.ping} ms.`});
    },
};  
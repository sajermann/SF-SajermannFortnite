import fs from 'fs';
import DiscordJs, { Intents, TextChannel } from 'discord.js';
import dotenv from 'dotenv';
import path from 'path';
import { UserServices } from './services/UserServices';
import { DevServices } from './services/DevServices';
import { formatDateAndHour } from './utils/formatDate';

const CHANNEL_BOT_ID = process.env.CHANNEL_BOT_ID || '';

const HTML = fs
	.readFileSync(path.resolve(__dirname, 'template', 'index.html'), 'utf8')
	.toString();

dotenv.config();

const client = new DiscordJs.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});


// Log na inicialização
client.once('ready', async () => {

	const channel = client.channels.cache.get(CHANNEL_BOT_ID);
	const devServices = new DevServices();
	const result = await devServices.getVersion()
	if (channel && channel.type === 'GUILD_TEXT' && result) {
		const message = `Bot restarted \n Version: ${result.version} \n Last Update: ${formatDateAndHour(new Date(result.lastUpdate))}`
		console.log(message)
		channel.send(message);
	}
});

client.on('messageCreate', async message => {
	if (!message.content.startsWith('sf-')) return;
	if (message.content === 'sf-version') {
		const devServices = new DevServices();
		const result = await devServices.getVersion()
		if (result?.version && result?.lastUpdate) {
			message.reply({
				content: `Version: ${result.version} \n Last Update: ${formatDateAndHour(new Date(result.lastUpdate))}`,
			});
		}
		return
	}
	try {
		const userForSearch = message.content.split('sf-')[1].split('#')[0];
		const platform = message.content.split('#')[1] || 'epic';
		const userServices = new UserServices();
		const result = await userServices.getStats(
			userForSearch as string,
			platform,
			HTML
		);
		if (!result) {
			message.reply({
				content: `Não localizei nenhum usuário com o nome ${userForSearch}`,
			});
			return;
		}

		message.reply({
			files: [result],
		});
	} catch (e) {
		console.log(`Err func stats: ${e}`);
		message.reply({
			content: `Ocorreu um erro na pesquisa!`,
		});
	}
});

client.login(process.env.TOKEN);

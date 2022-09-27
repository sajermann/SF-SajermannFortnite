import fs from 'fs';
import DiscordJs, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import { UserServices } from './services/UserServices';

const HTML = fs
	.readFileSync(`${__dirname}\\template\\index.html`, 'utf8')
	.toString();

dotenv.config();

const client = new DiscordJs.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
	console.log('Bot Online...');
});

client.on('messageCreate', async message => {
	if (!message.content.startsWith('sf-')) return;
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
		console.log(`Erro na função stats: ${e}`);
		message.reply({
			content: `Ocorreu um erro na pesquisa!`,
		});
	}
});

client.login(process.env.TOKEN);

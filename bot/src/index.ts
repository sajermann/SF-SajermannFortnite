import fs from 'node:fs';
import { resolve } from 'node:path';
import DiscordJs, { ChannelType, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { DevServices } from './services/DevServices';
import { UserServices } from './services/UserServices';
import { formatDateAndHour } from './utils/formatDate';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const CHANNEL_BOT_ID = process.env.CHANNEL_BOT_ID || '';

const RESOLVED = IS_DEVELOPMENT
  ? resolve(__dirname, 'template', 'index.html')
  : resolve(process.cwd(), 'template', 'index.html');

const HTML = fs.readFileSync(RESOLVED, 'utf8').toString();

dotenv.config();

const client = new DiscordJs.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Log na inicialização
client.once('ready', async () => {
  const channel = client.channels.cache.get(CHANNEL_BOT_ID);
  const devServices = new DevServices();
  const result = await devServices.getVersion();
  if (channel && channel.type === ChannelType.GuildText && result) {
    const message = `Bot restarted \nVersion: ${result.version} \nLast Update: ${formatDateAndHour(new Date(result.lastUpdate))} \nAmbient: ${IS_DEVELOPMENT ? 'Development' : 'Production'}`;
    if (!IS_DEVELOPMENT) {
      channel.send(message);
    }
  }
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith('sf-')) return;
  if (message.content === 'sf-version') {
    const devServices = new DevServices();
    const result = await devServices.getVersion();
    if (result?.version && result?.lastUpdate) {
      message.reply({
        content: `Version: ${result.version} \nLast Update: ${formatDateAndHour(new Date(result.lastUpdate))}`,
      });
    }
    return;
  }
  try {
    const userForSearch = message.content.split('sf-')[1].split('#')[0];
    const platform = message.content.split('#')[1] || 'epic';
    const userServices = new UserServices();
    const result = await userServices.getStats(
      userForSearch as string,
      platform,
      HTML,
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
      content: 'Ocorreu um erro na pesquisa!',
    });
  }
});

client.login(process.env.TOKEN);

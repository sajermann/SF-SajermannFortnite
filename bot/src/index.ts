import DiscordJs, { Intents } from "discord.js";
import dotenv from 'dotenv';
dotenv.config();

const client = new DiscordJs.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.on('ready',()=>{
  console.log('Bot Online porra')
});

client.on('messageCreate',(message)=>{
if(message.content === 'Oi'){
  message.reply({
    content: 'Olá'
  })
}
})

client.login(process.env.TOKEN);

import DiscordJs, { Intents } from "discord.js";
import dotenv from "dotenv";
import { UserServices } from "./services/UserServices";
dotenv.config();

const client = new DiscordJs.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Bot Online porra");
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith("sf-")) return;

  const userForSearch = message.content.split("sf-")[1];

  const userServices = new UserServices();
  const result = await userServices.getStats(userForSearch as string) as any;
  if(!result){
    message.reply({
      content: `Não localizei nenhum usuário com o nome ${userForSearch}`,
    });
    return;
  }
  const retorno:string[] = []
  retorno.push('Stats | Solo | Dupla | Trio | Squad')
  retorno.push(`KD | ${result.global_stats.solo.kd} | ${result.global_stats.duo.kd} | ${result.global_stats.trio.kd} | ${result.global_stats.squad.kd}`)
  retorno.push(`Kills | ${result.global_stats.solo.kills} | ${result.global_stats.duo.kills} | ${result.global_stats.trio.kills} | ${result.global_stats.squad.kills}`)
  retorno.push(`Matchs | ${result.global_stats.solo.matchesplayed} | ${result.global_stats.duo.matchesplayed} | ${result.global_stats.trio.matchesplayed} | ${result.global_stats.squad.matchesplayed}`)
  retorno.push(`Top 1 | ${result.global_stats.solo.placetop1} | ${result.global_stats.duo.placetop1} | ${result.global_stats.trio.placetop1} | ${result.global_stats.squad.placetop1}`)
  retorno.push(`Top 10 | ${result.global_stats.solo.placetop10} | ${result.global_stats.duo.placetop10} | ${result.global_stats.trio.placetop10} | ${result.global_stats.squad.placetop10}`)
  retorno.push(`Top 25 | ${result.global_stats.solo.placetop25} | ${result.global_stats.duo.placetop25} | ${result.global_stats.trio.placetop25} | ${result.global_stats.squad.placetop25}`)
  retorno.push(`Minutes | ${result.global_stats.solo.minutesplayed} | ${result.global_stats.duo.minutesplayed} | ${result.global_stats.trio.minutesplayed} | ${result.global_stats.squad.minutesplayed}`)
  console.log(retorno.join('\n'))
  //return res.status(200).json(result);


    message.reply({
      content: retorno.join('\n'),
    });

});

client.login(process.env.TOKEN);

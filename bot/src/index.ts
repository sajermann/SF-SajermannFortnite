import nodeHtmlToImage from "node-html-to-image";
import fs from "fs";
import DiscordJs, { Intents, BufferResolvable } from "discord.js";
import dotenv from "dotenv";
import { UserServices } from "./services/UserServices";
import build from "./utils";
dotenv.config();

const client = new DiscordJs.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Bot Online...");
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith("sf-")) return;
  try {
    const userForSearch = message.content.split("sf-")[1].split("#")[0];
    const platform = message.content.split("#")[1] || "epic";
    const userServices = new UserServices();
    const result = (await userServices.getStats(
      userForSearch as string,
      platform
    )) as any;
    if (!result) {
      message.reply({
        content: `Não localizei nenhum usuário com o nome ${userForSearch}`,
      });
      return;
    }

    console.log('Bruno Sajermann')

    const batataCreme = (await nodeHtmlToImage({
      html: fs
        .readFileSync(__dirname + "\\template\\index.html", "utf8")
        .toString(),
      content: {
        gamer: userForSearch,
        level: result.account.level,
        kdSolo: String(result.global_stats.solo?.kd || 0),
        kdDuo: String(result.global_stats.duo?.kd || 0),
        kdTrio: String(result.global_stats.trio?.kd || 0),
        kdSquad: String(result.global_stats.squad?.kd || 0),

        killsSolo: String(result.global_stats.solo?.kills || 0),
        killsDuo: String(result.global_stats.duo?.kills || 0),
        killsTrio: String(result.global_stats.trio?.kills || 0),
        killsSquad: String(result.global_stats.squad?.kills || 0),

        matchesSolo: String(result.global_stats.solo?.matchesplayed || 0),
        matchesDuo: String(result.global_stats.duo?.matchesplayed || 0),
        matchesTrio: String(result.global_stats.trio?.matchesplayed || 0),
        matchesSquad: String(result.global_stats.squad?.matchesplayed || 0),

        top1Solo: String(result.global_stats.solo?.placetop1 || 0),
        top1Duo: String(result.global_stats.duo?.placetop1 || 0),
        top1Trio: String(result.global_stats.trio?.placetop1 || 0),
        top1Squad: String(result.global_stats.squad?.placetop1 || 0),

        top10Solo: String(result.global_stats.solo?.placetop10 || 0),
        top10Duo: String(result.global_stats.duo?.placetop10 || 0),
        top10Trio: String(result.global_stats.trio?.placetop10 || 0),
        top10Squad: String(result.global_stats.squad?.placetop10 || 0),

        top25Solo: String(result.global_stats.solo?.placetop25 || 0),
        top25Duo: String(result.global_stats.duo?.placetop25 || 0),
        top25Trio: String(result.global_stats.trio?.placetop25 || 0),
        top25Squad: String(result.global_stats.squad?.placetop25 || 0),

        minutesSolo: String(result.global_stats.solo?.minutesplayed || 0),
        minutesDuo: String(result.global_stats.duo?.minutesplayed || 0),
        minutesTrio: String(result.global_stats.trio?.minutesplayed || 0),
        minutesSquad: String(result.global_stats.squad?.minutesplayed || 0),
      },
    })) as Buffer[];

    const sfattach = new DiscordJs.MessageAttachment(
      batataCreme as unknown as BufferResolvable,
      "output.png"
    );

    message.reply({
      files: [sfattach],
    });
  } catch (e) {
    console.log("Erro na função stats: " + e);
    message.reply({
      content: `Ocorreu um erro na pesquisa!`,
    });
  }
});

client.login(process.env.TOKEN);

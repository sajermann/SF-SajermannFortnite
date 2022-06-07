import DiscordJs, {
  CommandInteractionOptionResolver,
  Intents,
  MessageEmbed,
} from "discord.js";
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

    // console.log(result.global_stats)
    // console.log(result.global_stats.trio)
    // console.log(result.global_stats.trio.kd)
    const stringMounted: string[] = [];
    stringMounted.push(`${"```"}`);
    stringMounted.push(`Gamer: ${userForSearch} - ${result.account.level}`);
    stringMounted.push(`\n`);
    stringMounted.push(
      `${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: "Stats",
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: "Solo",
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: "Dupla",
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: "Trio",
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: "Squad",
      })}`
    );
    stringMounted.push(
      `${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: "KD",
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.solo?.kd || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.duo?.kd || 0),
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.trio?.kd || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.squad?.kd || 0),
      })}`
    );
    stringMounted.push(
      `${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: "Kills",
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.solo?.kills || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.duo?.kills || 0),
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.trio?.kills || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.squad?.kills || 0),
      })}`
    );
    stringMounted.push(
      `${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: "Matchs",
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.solo?.matchesplayed || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.duo?.matchesplayed || 0),
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.trio?.matchesplayed || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.squad?.matchesplayed || 0),
      })}`
    );
    stringMounted.push(
      `${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: "Top 1",
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.solo?.placetop1 || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.duo?.placetop1 || 0),
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.trio?.placetop1 || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.squad?.placetop1 || 0),
      })}`
    );
    stringMounted.push(
      `${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: "Top 10",
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.solo?.placetop10 || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.duo?.placetop10 || 0),
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.trio?.placetop10 || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.squad?.placetop10 || 0),
      })}`
    );
    stringMounted.push(
      `${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: "Top 25",
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.solo?.placetop25 || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.duo?.placetop25 || 0),
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.trio?.placetop25 || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.squad?.placetop25 || 0),
      })}`
    );
    stringMounted.push(
      `${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: "Minutos",
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.solo?.minutesplayed || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.duo?.minutesplayed || 0),
      })}${build({
        align: "Center",
        borderLeft: "",
        borderRight: "",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.trio?.minutesplayed || 0),
      })}${build({
        align: "Center",
        borderLeft: "|",
        borderRight: "|",
        caracteres: " ",
        limit: 20,
        value: String(result.global_stats.squad?.minutesplayed || 0),
      })}`
    );
    stringMounted.push(`${"```"}`);

    message.reply({
      content: `${stringMounted.join("\n")}`,
    });
  } catch (e) {
    console.log("Erro na função stats: " + e);
    message.reply({
      content: `Ocorreu um erro na pesquisa!`,
    });
  }
});

client.login(process.env.TOKEN);

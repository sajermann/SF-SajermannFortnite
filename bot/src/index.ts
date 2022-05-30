import DiscordJs, { Intents, MessageEmbed } from "discord.js";
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

  const userForSearch = message.content.split("sf-")[1];

  const userServices = new UserServices();
  const result = (await userServices.getStats(userForSearch as string)) as any;
  if (!result) {
    message.reply({
      content: `Não localizei nenhum usuário com o nome ${userForSearch}`,
    });
    return;
  }

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
      value: String(result.global_stats.solo.kd),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.duo.kd),
    })}${build({
      align: "Center",
      borderLeft: "",
      borderRight: "",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.trio.kd),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.squad.kd),
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
      value: String(result.global_stats.solo.kills),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.duo.kills),
    })}${build({
      align: "Center",
      borderLeft: "",
      borderRight: "",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.trio.kills),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.squad.kills),
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
      value: String(result.global_stats.solo.matchesplayed),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.duo.matchesplayed),
    })}${build({
      align: "Center",
      borderLeft: "",
      borderRight: "",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.trio.matchesplayed),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.squad.matchesplayed),
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
      value: String(result.global_stats.solo.placetop1),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.duo.placetop1),
    })}${build({
      align: "Center",
      borderLeft: "",
      borderRight: "",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.trio.placetop1),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.squad.placetop1),
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
      value: String(result.global_stats.solo.placetop10),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.duo.placetop10),
    })}${build({
      align: "Center",
      borderLeft: "",
      borderRight: "",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.trio.placetop10),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.squad.placetop10),
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
      value: String(result.global_stats.solo.placetop25),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.duo.placetop25),
    })}${build({
      align: "Center",
      borderLeft: "",
      borderRight: "",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.trio.placetop25),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.squad.placetop25),
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
      value: String(result.global_stats.solo.minutesplayed),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.duo.minutesplayed),
    })}${build({
      align: "Center",
      borderLeft: "",
      borderRight: "",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.trio.minutesplayed),
    })}${build({
      align: "Center",
      borderLeft: "|",
      borderRight: "|",
      caracteres: " ",
      limit: 20,
      value: String(result.global_stats.squad.minutesplayed),
    })}`
  );
  stringMounted.push(`${"```"}`);

  message.reply({
    content: `${stringMounted.join("\n")}`,
  });
});

client.login(process.env.TOKEN);

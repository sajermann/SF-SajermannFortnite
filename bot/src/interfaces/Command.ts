import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  GuildMember,
  ApplicationCommandData,
  CommandInteractionOptionResolver,
} from "discord.js";
import { TypeOnlyAliasDeclaration } from "typescript";

import Client from "../client";

export interface ExtendInteraction extends CommandInteraction {
  member: GuildMember;
}

interface RunOptions {
  client: Client;
  interaction: ExtendInteraction;
  args: CommandInteractionOptionResolver;
}

type Run = (options: RunOptions) => any;

export type Command = ApplicationCommandData & {
  name: string;
  description: string;
  test: TypeOnlyAliasDeclaration;
  run: Run;
} & ChatInputApplicationCommandData;

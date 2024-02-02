import { SlashCommandBuilder } from "discord.js";
import { CommandOptions } from "../types/standardTypes";
import Client from "./Client";
import Discord from "discord.js";
import DBHandler from "./DBHandler";
import ChannelUpdater from "./ChannelUpdater";

class Command extends SlashCommandBuilder {
  executeFunc: any;
  ownerOnly: boolean;
  category: string;
  client: Client;
  db: DBHandler;
  channelUpdater: ChannelUpdater;
  constructor(commandOptions: CommandOptions) {
    super();
    this.executeFunc = this.execute;
    this.ownerOnly = false;
    this.category = "uncategorized";
    this.client = commandOptions.client;
    this.db = commandOptions.db;
    this.channelUpdater = commandOptions.channelUpdater;
  }

  async execute(interaction: Discord.CommandInteraction) {
    interaction.reply("base reply");
  }
}

export default Command;

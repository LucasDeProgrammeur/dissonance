import { SlashCommandBuilder } from "discord.js";
import { CommandOptions } from "../types/standardTypes";
import Client from "./Client";
import Discord from "discord.js";

class Command extends SlashCommandBuilder {
  executeFunc: any;
  ownerOnly: boolean;
  category: string;
  client: Client;
  constructor(commandOptions: CommandOptions) {
    super();
    this.executeFunc = this.execute;
    this.ownerOnly = false;
    this.category = "uncategorized";
    this.client = commandOptions.client;
  }

  async execute(interaction: Discord.CommandInteraction) {
    interaction.reply("base reply");
  }
}

export default Command;

import { SlashCommandBuilder } from "discord.js";
import { CommandOptions } from "../types/standardTypes";
import Client from "./Client";
import Discord from "discord.js";

class Command extends SlashCommandBuilder {
  executeFunc: any;
  client: Client;
  ownerOnly: boolean;
  category: string;
  constructor(commandOptions: CommandOptions) {
    super();
    this.executeFunc = this.execute;
    this.client = commandOptions.client;
    this.ownerOnly = false;
    this.category = "uncategorized";
  }

  async execute(interaction: Discord.CommandInteraction) {
    interaction.reply("base reply");
  }
}

export default Command;

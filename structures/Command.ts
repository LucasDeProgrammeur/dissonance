import { SlashCommandBuilder } from "discord.js";
import { CommandOptions } from "../types/standardTypes";
import Client from "./Client";
import Discord from "discord.js";

class Command extends SlashCommandBuilder {
  executeFunc: any;
  client: Client;
  ownerOnly: boolean;
  constructor(commandOptions: CommandOptions) {
    super();
    this.executeFunc = this.execute;
    this.client = commandOptions.client;
    this.ownerOnly = false;
  }

  async execute(interaction: Discord.CommandInteraction) {
    interaction.reply("base reply");
  }
}

export default Command;

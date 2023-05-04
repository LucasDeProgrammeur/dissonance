import { Events, Collection } from "discord.js";
import Discord from "discord.js";
import Client from "../structures/Client";
import { InteractionCreateOptions } from "../types/standardTypes";
import ConfigHandler from "../structures/ConfigHandler.js";

class InteractionCreate {
  client: Client;
  config: ConfigHandler;
  constructor(options: InteractionCreateOptions) {
    this.client = options.client;
    this.config = options.config;
    this.client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }
      try {
        if (
          command.ownerOnly === true &&
          Number(interaction.user.id) !== Number(this.config.configData.owner)
        ) {
          interaction.reply(
            "❌ This command has owner only enabled. You are not set as the owner."
          );
          return;
        }
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
    });
  }
}

export default InteractionCreate;

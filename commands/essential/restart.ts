import Discord, { EmbedBuilder } from "discord.js";
import Command from "../../structures/Command.js";
import { CommandOptions } from "../../types/standardTypes.js";
import Initialize from "../../index.js";

class Restart extends Command {
  executeFunc: any;
  constructor(commandOptions: CommandOptions) {
    super(commandOptions);
    this.setName("restart");
    this.setDescription("Restart the bot");
    this.executeFunc = this.execute;
    this.ownerOnly = true;
  }

  async execute(interaction: Discord.CommandInteraction) {
    const shutdownEmbed = new EmbedBuilder()
      .setTitle("Restarting...")
      .setDescription("Restarting the bot, wait a few moments to continue!")
      .setColor("Red")

    const restartEmbed = new EmbedBuilder()
        .setTitle("Restarted!")
        .setColor("Green")

    await interaction.reply({ embeds: [shutdownEmbed ]});

    this.client.commands.clear()
    this.client.destroy()
    Initialize();



  }


}

export default Restart;

import Discord, { EmbedBuilder } from "discord.js";
import Command from "../../structures/Command.js";
import { CommandOptions } from "../../types/standardTypes.js";
import Initialize from "../../index.js";
import CommandRegistrar from "../../structures/CommandRegistrar.js";
import getCommandPath from "../../helpers/getCommandPath.js";

class ReloadCommand extends Command {
  executeFunc: any;
  constructor(commandOptions: CommandOptions) {
    super(commandOptions);
    this.setName("reloadcommand");
    this.setDescription("Reload a specific command");
    this.executeFunc = this.execute;
    this.ownerOnly = true;
    this.addStringOption((option) =>
      option
        .setName("commandname")
        .setDescription("Command name to reset")
        .setRequired(true)
    );
  }

  async execute(interaction: Discord.CommandInteraction) {
    const reloadEmbed = new EmbedBuilder()
      .setTitle("Command reloaded!")
      .setDescription("You have reloaded a command")
      .setColor("Green");

    const failEmbed = new EmbedBuilder()
      .setTitle("Command reload failed")
      .setColor("Red");

    let commandToRestart = interaction.options
      .get("commandname")
      ?.value?.toString();

     let path = getCommandPath("./commands", commandToRestart!)
    path = path.replace("./", "../../");

    interaction.client.commands.delete(commandToRestart);
    let { default: CommandClass } = await import(path || "");
    let commandInstance = new CommandClass({client: this.client, logger: this.client.logger});
    this.client.commands.set(commandInstance.name, commandInstance, commandInstance.category)
    await interaction.reply({ embeds: [reloadEmbed] });
  }
}

export default ReloadCommand;

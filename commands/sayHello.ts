import Discord from "discord.js";
import Command from "../structures/Command.js";
import { CommandOptions } from "../types/standardTypes.js";

class SayHello extends Command {
  executeFunc: any;
  constructor(commandOptions: CommandOptions) {
    super(commandOptions);
    this.setName("sayhello");
    this.setDescription("This is a test command");
    this.executeFunc = this.execute;
    this.ownerOnly = true;
    this.category = "basic";
  }

  async execute(interaction: Discord.CommandInteraction) {
    await interaction.reply("Hello");
  }
}

export default SayHello;

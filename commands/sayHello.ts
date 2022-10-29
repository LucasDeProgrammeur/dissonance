import Discord from "discord.js";
import Command from "../structures/Command.js";
import { CommandOptions } from "../types/standardTypes.js";

class SayHello extends Command {
  executeFunc: any;
  constructor(commandOptions: CommandOptions) {
    super(commandOptions);
    this.setName("sayhello");
    this.setDescription("Dit is een test command");
    this.executeFunc = this.execute;
    this.ownerOnly = true;
  }

  async execute(interaction: Discord.CommandInteraction) {
    await interaction.reply("Hi");
  }
}

export default SayHello;

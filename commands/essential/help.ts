import Discord, { EmbedBuilder } from "discord.js";
import Command from "../../structures/Command.js";
import { CommandOptions } from "../../types/standardTypes.js";

class Help extends Command {
  executeFunc: any;
  constructor(commandOptions: CommandOptions) {
    super(commandOptions);
    this.setName("help");
    this.setDescription("Show and explain all commands");
    this.executeFunc = this.execute;
    this.ownerOnly = false;
  }

  async execute(interaction: Discord.CommandInteraction) {
    let addedCategories: Array<string> = [];

    const helpEmbed = new EmbedBuilder()
      .setTitle("Help for " + this.client.user?.username)
      .setDescription("For a more detailed description on any command, use `/help [command]`")
      const sortedCommands = [...this.client.commands.values()].sort((a, b) => (a.category.localeCompare(b.category)))
    
      sortedCommands.forEach((x: Command) => {
        if (addedCategories.find((el) => el === x.category) === undefined) {
            helpEmbed.addFields({name: "> " + x.category, value: `Commands within the ${x.category} category`})
        }

        helpEmbed.addFields({name: x.name, value: x.description})
      })

    await interaction.reply({ embeds: [helpEmbed ]});
  }


}

export default Help;

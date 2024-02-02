import Discord, { EmbedBuilder } from "discord.js";
import Command from "../../structures/Command.js";
import { CommandOptions } from "../../types/standardTypes.js";
import ChannelUpdater from "../../structures/ChannelUpdater.js";
import DBHandler from "../../structures/DBHandler.js";

class GenerateChannelUpdates extends Command {
  executeFunc: any;
  constructor(commandOptions: CommandOptions) {
    super(commandOptions);
    this.setName("generatechannelupdates");
    this.setDescription("Link an API to the bot and show occasional updates");
    this.addStringOption((option) =>
      option
        .setName("channelupdatename")
        .setRequired(true)
        .setDescription("Channel update identifier name")
    );
    this.addStringOption((option) =>
      option
        .setName("title")
        .setRequired(true)
        .setDescription("Title shown with every update")
    );
    this.addNumberOption((option) =>
      option
        .setName("interval")
        .setRequired(true)
        .setDescription("The interval in milliseconds")
    );
    this.executeFunc = this.execute;
    this.ownerOnly = false;
  }

  async execute(interaction: Discord.CommandInteraction) {
    const channelUpdateName = interaction.options.get("channelupdatename")!.value?.toString()
    const updateTitle = interaction.options.get("title")!.value?.toString()!
    const interval = Number(interaction.options.get("interval")!.value)
    const db = new DBHandler();

    console.log("channel ID", interaction.channel!.id, "channel update name: ", channelUpdateName, "channel update title: " + updateTitle, "Channel update inverval: " + interval)
    await db.addChannelUpdateRecord(interaction.channel!.id, channelUpdateName!, updateTitle, interval);
    console.log(this.client)
    const channelUpdater = new ChannelUpdater(this.client);
    channelUpdater.addUpdateInterval(channelUpdateName!, updateTitle, interval, interaction);
    await interaction.reply("Added this channel for occasional updates");
  }
}

export default GenerateChannelUpdates;

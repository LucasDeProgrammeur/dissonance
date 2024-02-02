import {
  CommandInteraction,
  TextChannel,
} from "discord.js";
import Client from "./Client";

class ChannelUpdater {
  client: Client;

  constructor(client: Client) {
    this.client = client;

    // this.sendMessageToChannel()
  }

  sendMessageToChannel() {
    console.log(this.client.channels.cache.size);
    const channel = this.client.channels.cache.get(
      "1035834488250437717"
    ) as TextChannel;
    channel &&
      channel.send(
        "⏰ This channel has been set to receive updates. If you've received this message, it means the bot has restarted."
      );
  }

  addUpdateInterval(
    channelUpdateName: string,
    title: string,
    interval: number,
    interaction?: CommandInteraction,
    client?: Client,
    channelId?: string
  ): void {
    console.log("ADD UPDATE INTERVAL");
    setInterval(() => {
      if (interaction) {
        interaction.channel?.send(title);
      } else if (client && channelId) {
        const channel = client.channels.cache.get(channelId) as TextChannel;
        channel.send(title)
      } else {
        console.error("Either pass a client + channelId or Interaction to this function.");
      }
    }, interval);
  }
}

export default ChannelUpdater;

import ClientOptions from "../types/standardTypes";
import Discord from "discord.js";
import { Events } from "discord.js";

class Client extends Discord.Client {
  token: string;
  constructor(clientOptions: ClientOptions) {
    super(clientOptions);
    this.token = clientOptions.token;

    this.once(Events.ClientReady, (c) => {
      console.log(`Ready! Logged in as ${c.user.tag}`);
    });

    this.login(process.env.TOKEN);
  }
}

export default Client;

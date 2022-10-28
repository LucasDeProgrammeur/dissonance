import { ClientOptions } from "../types/standardTypes";
import Discord, { Collection } from "discord.js";
import { Events } from "discord.js";
import Logger from "./Logger";
import CommandRegistrar from "./CommandRegistrar.js";
import InteractionCreate from "../events/InteractionCreate.js";

class Client extends Discord.Client {
  token: string;
  logger: Logger;
  commands: any;
  appId: string;
  constructor(clientOptions: ClientOptions) {
    super(clientOptions);
    this.token = clientOptions.token;
    this.logger = clientOptions.logger;
    this.commands = new Collection();
    this.appId = process.env.APPLICATIONID!;
    this.logger.addLoader("loadServer", "Loading bot instance...");
    this.once(Events.ClientReady, (c) => {
      this.logger.loaderSucceed(
        "loadServer",
        "Your bot, " + this.user?.username + " has loaded!"
      );
      let commandRegistrar = new CommandRegistrar({
        client: this,
        logger: this.logger,
      });

      new InteractionCreate({ client: this });
    });

    this.login(process.env.TOKEN);
  }
}

export default Client;

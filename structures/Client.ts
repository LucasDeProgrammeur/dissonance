import { ChannelUpdate, ClientOptions } from "../types/standardTypes";
import Discord, { ActivityType, Collection } from "discord.js";
import { Events } from "discord.js";
import Logger from "./Logger";
import CommandRegistrar from "./CommandRegistrar.js";
import InteractionCreate from "../events/InteractionCreate.js";
import ConfigHandler from "./ConfigHandler.js";
import { Configuration, OpenAIApi } from "openai";
import DBHandler from "./DBHandler.js";
import ChannelUpdater from "./ChannelUpdater.js";

class Client extends Discord.Client {
  token: string;
  logger: Logger;
  commands: any;
  appId: string;
  AIFunc: OpenAIApi;
  catChat: any;
  channelUpdater: ChannelUpdater;
  constructor(clientOptions: ClientOptions) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    super(clientOptions);
    let config = new ConfigHandler();
    this.token = clientOptions.token;
    this.channelUpdater = new ChannelUpdater(this);
    this.logger = clientOptions.logger;
    this.commands = new Collection();
    this.appId = process.env.APPLICATIONID!;
    this.logger.addLoader("loadServer", "Loading bot instance...");
    this.AIFunc = new OpenAIApi(configuration);
    let db = new DBHandler(this.logger);
    let registrar = new CommandRegistrar({
      client: this,
      db,
      channelUpdater: this.channelUpdater
    });

    this.once(Events.ClientReady, async (c) => {
      this.user?.setActivity(config.configData.botStatus, {
        type: ActivityType.Watching,
        url: "",
        name: "something",
      });
      this.logger.loaderSucceed(
        "loadServer",
        "Your bot, " + this.user?.username + " has loaded!"
      );
      registrar?.execute();

      new InteractionCreate({ client: this, config: config });

      if (config.configData.enableDB) {
        // const data = new DBHandler(this.logger, config);
        if (config.configData.enableChannelUpdates) {
          this.generateChannelUpdates(db);
        }
      }
    });

    this.login(process.env.TOKEN);
  }

  async generateChannelUpdates(data: DBHandler) {
    await data.initChannelUpdates();
    const channelUpdates = await data.getChannelUpdateRecords() as unknown as ChannelUpdate[]
    console.log(channelUpdates)
    channelUpdates.forEach(e => this.channelUpdater.addUpdateInterval(e.channelUpdateName, e.title, e.interval, undefined, this, e.channelId))

  }
}

export default Client;

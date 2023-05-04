import { Collection, Events, GatewayIntentBits } from "discord.js";
import Client from "./structures/Client.js";
import * as dotenv from "dotenv";
import Logger from "./structures/Logger.js";
dotenv.config();

declare module "discord.js" {
  export interface Client {
    commands: Collection<unknown, any>;
  }
}

const Initialize = () => {
  const logger = new Logger();

  const BotClient = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],
    token: process.env.token || "",
    logger: logger,
  });
  return BotClient;
};

Initialize();

export default Initialize;

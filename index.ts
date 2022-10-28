import { Events, GatewayIntentBits } from "discord.js";
import Client from "./structures/Client.js";
import * as dotenv from "dotenv";
import Logger from "./structures/Logger.js";
dotenv.config();

const Initialize = () => {
  console.log("Initializing...");
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
};

Initialize();

export default Initialize;

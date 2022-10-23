import { Events, GatewayIntentBits } from "discord.js";
import Client from "./structures/Client";
import * as dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  token: process.env.token || "",
});

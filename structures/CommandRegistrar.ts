import { CommandRegistrarOptions } from "../types/standardTypes";
import * as fs from "fs";
import { Collection, REST } from "discord.js";
import Logger from "./Logger";
import { Routes } from "discord.js";
import Client from "./Client";
import Command from "./Command";

class CommandRegistrar {
  client: Client;
  logger: Logger;
  commands: Array<any>;
  constructor(commandRegistrarOptions: CommandRegistrarOptions) {
    this.client = commandRegistrarOptions.client;
    this.logger = commandRegistrarOptions.logger;
    this.commands = [];
    this.registerCommands();
  }

  async registerCommands() {
    const rest = new REST({ version: "9" }).setToken(this.client.token);
    let commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".ts"));
    commandFiles.forEach(async (command) => {
      this.logger.addLoader("loadingCommand", `Importing: ${command}`);
      let { default: CommandClass } = await import(`../commands/${command}`);
      let commandInstance = new CommandClass(this.client, this.logger);
      console.log(commandInstance.data)
      this.client.commands.set(commandInstance.name, commandInstance)
      this.logger.loaderSucceed("loadingCommand", `Imported: ${command}`);
    });

    try {
      this.logger.addLoader(
        "LoadCommandsIntoDiscord",
        "Loading commands into bot..."
      );
      await rest.put(Routes.applicationCommands(this.client.appId), {
        body: this.commands,
      });
      this.logger.loaderSucceed(
        "LoadCommandsIntoDiscord",
        "Successfully loaded commands into bot!"
      );
    } catch (e) {
      this.logger.loaderFailure(
        "LoadCommandsIntoDiscord",
        "Failed to load commands into the bot: error: " + e
      );
    }
  }
}

export default CommandRegistrar;

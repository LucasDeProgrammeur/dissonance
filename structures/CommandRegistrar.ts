import { CommandRegistrarOptions } from "../types/standardTypes";
import * as fs from "fs";
import { Collection, REST } from "discord.js";
import Logger from "./Logger";
import { Routes } from "discord.js";
import Client from "./Client";

class CommandRegistrar {
  client: Client;
  logger: Logger;
  commands: Array<any>;
  constructor(commandRegistrarOptions: CommandRegistrarOptions) {
    this.client = commandRegistrarOptions.client;
    this.logger = commandRegistrarOptions.logger;
    this.commands = [];
    this.execute();
  }

  async execute () {
    this.logger.addLoader(
      "LoadCommandsIntoDiscord",
      "Loading commands into bot..."
    );
    this.readFilesRecursively("./commands").then(() =>
      this.logger.loaderSucceed(
        "LoadCommandsIntoDiscord", "Successfully loaded commands into bot!"
      )
    );
  }


  async readFilesRecursively (basePath: string) {
    const rest = new REST({ version: "9" }).setToken(this.client.token);
      
      
      
    let commandFiles = fs
      .readdirSync(basePath)
  
  
    for (const filePath of commandFiles) {
  
      const stat = fs.statSync(basePath + "\\" + filePath)
      if (stat.isDirectory()) {
        await this.readFilesRecursively(basePath + "\\" + filePath)
        continue;
      }

      let command = filePath;
  
      this.logger.addLoader("loadingCommand" + command, `Importing: ${command}`);
      let { default: CommandClass } = await import(`../${basePath}\\${command}`);
      let commandInstance = new CommandClass({client: this.client, logger: this.logger});
      this.commands.push(commandInstance.toJSON());
      this.client.commands.set(commandInstance.name, commandInstance, commandInstance.category);
      this.logger.loaderSucceed("loadingCommand" + command, `Imported: ${command}`);
    }
    try {
      await rest.put(Routes.applicationCommands(this.client.appId), {
        body: this.commands,
      });
    } catch (e) {
      this.logger.loaderFailure(
        "LoadCommandsIntoDiscord",
        "Failed to load commands into the bot: error: " + e
      );
    }
  }
}

export default CommandRegistrar;

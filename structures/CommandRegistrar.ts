import { CommandRegistrarOptions } from "../types/standardTypes";
import * as fs from "fs";
import { Collection, REST } from "discord.js";
import Logger from "./Logger";
import { Routes } from "discord.js";
import Client from "./Client";

class CommandRegistrar {
  client: Client;
  commands: Array<any>;
  constructor(commandRegistrarOptions: CommandRegistrarOptions) {
    this.client = commandRegistrarOptions.client;
    this.commands = [];
    this.client = commandRegistrarOptions.client;
  }

  async execute() {
    this.client.logger.addLoader(
      "LoadCommandsIntoDiscord",
      "Loading commands into bot..."
    );
    this.readFilesRecursively("./commands").then(async () => {
      this.client.logger.loaderSucceed(
        "LoadCommandsIntoDiscord",
        "Successfully loaded commands into bot!"
      );

      try {
        const rest = new REST({ version: "9" }).setToken(this.client.token);
        await rest.put(Routes.applicationCommands(this.client.appId), {
          body: this.client.commands,
        });
      } catch (e) {
        this.client.logger.loaderFailure(
          "LoadCommandsIntoDiscord",
          "Failed to load commands into the bot: error: " + e
        );
      }
    });
  }

  async readFilesRecursively(basePath: string, commandToLoad?: string) {
    let currentCommand = "";

    let commandFiles = fs.readdirSync(basePath);

    for (const filePath of commandFiles) {
      const stat = fs.statSync(basePath + "/" + filePath);
      if (stat.isDirectory()) {
        await this.readFilesRecursively(basePath + "/" + filePath);
        continue;
      }

      let command = filePath;
      currentCommand = command;

      if (commandToLoad != undefined && !command.includes(commandToLoad)) {
        continue;
      }

      this.client.logger.addLoader(
        "loadingCommand" + command,
        `Importing: ${command}`
      );
      let { default: CommandClass } = await import(
        `../${basePath}\\${command}`
      );
      let commandInstance = new CommandClass({client: this.client});
      this.commands.push(commandInstance.toJSON());
      this.client.commands.set(
        commandInstance.name,
        commandInstance,
        commandInstance.category
      );
      this.client.logger.loaderSucceed(
        "loadingCommand" + command,
        `Imported: ${command}`
      );
    }
  }
}

export default CommandRegistrar;

import { CommandRegistrarOptions } from "../types/standardTypes";
import * as fs from "fs";
import { Collection, REST } from "discord.js";
import Logger from "./Logger";
import { Routes } from "discord.js";
import Client from "./Client";
import ConfigHandler from "./ConfigHandler.js";
import DBHandler from "./DBHandler";
import ChannelUpdater from "./ChannelUpdater";

class CommandRegistrar {
  client: Client;
  commands: Array<any>;
  db: DBHandler;
  channelUpdater: ChannelUpdater;
  constructor(commandRegistrarOptions: CommandRegistrarOptions) {
    this.client = commandRegistrarOptions.client;
    this.commands = [];
    this.client = commandRegistrarOptions.client;
    this.db = commandRegistrarOptions.db;
    this.channelUpdater = commandRegistrarOptions.channelUpdater;
  }

  async execute() {
    let config = new ConfigHandler();
    this.client.logger.addLoader(
      "LoadCommandsIntoDiscord",
      "Loading commands into bot..."
    );
    this.readFilesRecursively("./commands").then(async () => {


      if (config.configData.sendCommandSignaturesToDiscord) {

        this.sendCommandSignaturesToDiscord();
      }

      this.client.logger.loaderSucceed(
        "LoadCommandsIntoDiscord",
        "Successfully loaded commands into bot!"
      );


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
      let commandInstance = new CommandClass({client: this.client, db: this.db, channelUpdater: this.client.channelUpdater});
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

  async sendCommandSignaturesToDiscord () {
    this.client.logger.addLoader("sendToDiscord", "Sending new command structure to Discord...")
    
    try {
      let commandsWithoutDb = [...this.client.commands];
      commandsWithoutDb.forEach((e: any) => {delete e[1]['db']; delete e[1]["client"]; delete e[1]["channelUpdater"]})
      commandsWithoutDb = commandsWithoutDb.map(e => e[1]);

      const rest = new REST().setToken(this.client.token);
      await rest.put(Routes.applicationCommands(this.client.appId), {
        body: commandsWithoutDb,
      });
    } catch (e) {
      this.client.logger.loaderFailure("sendToDiscord", "Sending command structure to Discord failed!")
      this.client.logger.loaderFailure(
        "LoadCommandsIntoDiscord",
        "Failed to load commands into the bot: error: " + e
        );
        return;
      }
      this.client.logger.loaderSucceed("sendToDiscord", "Command structure sent to Discord")
  }
}

export default CommandRegistrar;

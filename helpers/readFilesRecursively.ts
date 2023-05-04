import { REST, Routes } from "discord.js";
import * as fs from "fs";
import Logger from "../structures/Logger";
import Client from "../structures/Client";

const ReadFilesRecursively = async (client: Client, logger: Logger, basePath: string, commandToLoad?: string) => {
    const rest = new REST({ version: "9" }).setToken(client.token);
    let commands = [];
      
    let commandFiles = fs
      .readdirSync(basePath)
  
  
    for (const filePath of commandFiles) {
      const stat = fs.statSync(basePath + "\\" + filePath)
      if (stat.isDirectory()) {
        await ReadFilesRecursively(client, logger, basePath + "\\" + filePath, commandToLoad)
        continue;
      }

      let command = filePath;

      if (commandToLoad != undefined && !command.includes(commandToLoad)) {
        continue;
      }
  
      logger.addLoader("loadingCommand" + command, `Importing: ${command}`);
      let { default: CommandClass } = await import(`../${basePath}\\${command}`);
      let commandInstance = new CommandClass({client: client, logger: logger});
      commands.push(commandInstance.toJSON());
      client.commands.set(commandInstance.name, commandInstance, commandInstance.category);
      logger.loaderSucceed("loadingCommand" + command, `Imported: ${command}`);
    }
    try {
      await rest.put(Routes.applicationCommands(client.appId), {
        body: commands,
      });
    } catch (e) {
      logger.loaderFailure(
        "LoadCommandsIntoDiscord",
        "Failed to load commands into the bot: error: " + e
      );
    }
  }

  export default ReadFilesRecursively;
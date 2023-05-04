import { AnyComponentBuilder, REST, Routes } from "discord.js";
import * as fs from "fs";
import Logger from "../structures/Logger";
import Client from "../structures/Client";

const getCommandPath = (basePath: string, commandToLoad?: string) => {
    let commandPath = "";
    let commandFiles = fs
      .readdirSync(basePath)
    for (const filePath of commandFiles) {
      const stat = fs.statSync(basePath + "\\" + filePath)
      if (stat.isDirectory()) {
        let recurGet: string = getCommandPath(basePath + "\\" + filePath, commandToLoad)
        if (recurGet.length) {
          return recurGet;
        } 
        continue;
      }

      let command = filePath;

      if (commandToLoad != undefined && !command.includes(commandToLoad)) {
        continue;
      }

      
      commandPath = `${basePath}\\${command}`;

    }
      return commandPath;

  }

  export default getCommandPath;
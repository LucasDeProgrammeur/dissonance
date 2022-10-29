import fs from "fs";
import { Config } from "../types/standardTypes";

class ConfigHandler {
  configData: Config;
  constructor() {
    this.configData = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
  }
}

export default ConfigHandler;

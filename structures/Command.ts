import { SlashCommandBuilder } from "discord.js";
import { CommandOptions } from "../types/standardTypes";
import Client from "./Client";

class Command extends SlashCommandBuilder {
    executeFunc: any;
    client: Client;
    constructor(commandOptions: CommandOptions) {
        super()
        this.executeFunc = commandOptions.executeFunc;
        this.client = commandOptions.client;
        this.initCommand();
    }

    initCommand() {
        this.setName("testcommand");
        this.setDescription("Test description");
    }

}

export default Command;
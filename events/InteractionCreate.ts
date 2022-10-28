import { Events } from "discord.js";
import Client from "../structures/Client";
import { InteractionCreateOptions } from "../types/standardTypes";

class InteractionCreate {
    client: Client;
    constructor (options: InteractionCreateOptions) {
        this.client = options.client;
        this.client.on(Events.MessageCreate, async interaction => {
            console.log("test")
        })
        console.log("Created new interaction event")
    }


}

export default InteractionCreate;
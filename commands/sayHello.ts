import Command from "../structures/Command.js"
import { CommandOptions } from "../types/standardTypes.js"

class SayHello extends Command {
    constructor(commandOptions: CommandOptions) {
        super(commandOptions);
        this.setName("sayhello")
        this.setDescription("Dit is een test command")
    }

    async execute(interaction: any) {
        await interaction.reply("Hello!")
    }
}

export default SayHello;
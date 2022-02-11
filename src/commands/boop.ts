import type { Command, CommandExecuteCallback } from "../client/commands";

const execute: CommandExecuteCallback = async (client, message) => {
  message.reply("Boop!");
};

const BoopCommand: Command = {
  name: "boop",
  description: "Boop!",
  usage: "boop",
  aliases: [],
  execute,
};

export default BoopCommand;

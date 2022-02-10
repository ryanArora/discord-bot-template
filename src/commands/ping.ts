import type { Command, CommandExecuteCallback } from "../client/commands";

const execute: CommandExecuteCallback = async (client, message) => {
  message.channel.send(`Pong! Latency is \`${client.ws.ping}ms\``);
};

const PingCommand: Command = {
  name: "ping",
  description: "Ping!",
  usage: "ping",
  aliases: ["latency", "delay"],
  execute,
}

export default PingCommand;

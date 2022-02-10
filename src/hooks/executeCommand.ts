import type { Message } from "discord.js";
import type { Hook, HookExecuteCallback } from "../client/hooks";

const executeCommand: HookExecuteCallback = async (client, message: Message) => {
  if (!message.guild) return;
  if (message.author.bot) return;

  const prefix = client.prefix;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift()?.toLowerCase();
  if (!commandName) return;

  const command = client.commands.get(commandName) ?? client.commands.find((cmd) => cmd.aliases.includes(commandName));
  if (!command) return;

  command.execute(client, message, args);
};

const ExecuteCommandHook: Hook = {
  type: "messageCreate",
  execute: executeCommand,
};

export default ExecuteCommandHook;

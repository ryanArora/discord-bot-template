import fs from "fs-extra";
import path from "path";
import invariant from "tiny-invariant";
import type { Client, Message } from "discord.js";

export type CommandExecuteCallback = (client: Client, message: Message, args: string[]) => Promise<void>;

export interface Command {
  name: string;
  description: string;
  usage: string;
  aliases: string[];
  execute: CommandExecuteCallback;
}

export function isValidCommand(cmd: any): cmd is Command {
  // prettier-ignore
  return (
    typeof cmd?.name === "string" &&
    typeof cmd?.description === "string" &&
    typeof cmd?.usage === "string" &&
    Array.isArray(cmd?.aliases) &&
    cmd.aliases.every((alias: unknown) => typeof alias === "string") &&
    typeof cmd?.execute === "function"
  );
}

export function registerCommands(client: Client, commandsDir: string) {
  client.logger.info("Registering commands:");
  const files = fs.readdirSync(commandsDir);

  for (const file of files) {
    if (!file.endsWith(".js")) continue;

    const filePath = path.join(commandsDir, file);
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) continue;

    const command = require(filePath).default;
    invariant(isValidCommand(command), `Command ${file} is not valid`);

    client.commands.set(command.name.toLowerCase(), command);
    client.logger.info(` - ${command.name}`);
  }
}

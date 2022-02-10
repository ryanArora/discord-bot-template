import { Collection } from "discord.js";
import logger from "./logger";
import type { Client, Command } from "discord.js";
import type { Logger } from "./logger";

export interface ClientExtensions {
  readonly prefix: string;
  readonly logger: Logger;
  readonly commands: Collection<Command["name"], Command>;
}

export const extensions: ClientExtensions = {
  prefix: "=",
  logger,
  commands: new Collection(),
};

/**
 * Add the custom extensions to a discord.js Client
 * This should be called as soon as possible after client initialization
 */
export default function transformClient(client: Client) {
  const newClient: Client = Object.assign({}, client, extensions);
  return newClient;
}

import type { ClientExtensions } from "../src/client/transform";
import type { Command as ClientCommand } from "../src/client/commands";

declare module "discord.js" {
  interface Client extends ClientExtensions {}
  interface Command extends ClientCommand {}
}

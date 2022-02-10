import fs from "fs-extra";
import path from "path";
import invariant from "tiny-invariant";
import type { Client } from "discord.js";

export type HookExecuteCallback = (client: Client, ...args: any[]) => Promise<void>;

export interface Hook {
  type: string;
  execute: HookExecuteCallback;
}

export function isValidHook(hook: Hook): hook is Hook {
  // prettier-ignore
  return (
    typeof hook?.type === "string" &&
    typeof hook?.execute === "function"
  );
}

export function registerHooks(client: Client, hooksDir: string) {
  client.logger.info("Registering hooks:");
  const files = fs.readdirSync(hooksDir);

  for (const file of files) {
    if (!file.endsWith(".js")) continue;

    const filePath = path.join(hooksDir, file);
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) continue;

    const hook = require(filePath).default;
    invariant(isValidHook(hook), `Hook ${file} is not valid`);

    client.on(hook.type, hook.execute.bind(null, client));
    client.logger.info(` - ${path.basename(file, ".js")}`);
  }
}

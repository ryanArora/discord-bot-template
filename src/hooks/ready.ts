import type { Hook, HookExecuteCallback } from "../client/hooks";

const ready: HookExecuteCallback = async (client) => {
  client.logger.info(`Client ${client.user?.tag} is ready to serve ${client.guilds.cache.size} guilds!`);
};

const ReadyHook: Hook = {
  type: "ready",
  execute: ready,
};

export default ReadyHook;

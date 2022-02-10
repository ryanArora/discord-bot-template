import dotenv from "dotenv";
import invariant from "tiny-invariant";

dotenv.config();
invariant(process.env.DISCORD_TOKEN, "DISCORD_TOKEN is required");

import path from "path";
import Discord from "discord.js";
import transformClient from "./client/transform";
import { registerHooks } from "./client/hooks";
import { registerCommands } from "./client/commands";

const client = transformClient(new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] }));
registerHooks(client, path.join(__dirname, "hooks"));
registerCommands(client, path.join(__dirname, "commands"));

client.login(process.env.DISCORD_TOKEN);

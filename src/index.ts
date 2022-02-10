import dotenv from "dotenv";
import invariant from "tiny-invariant";

dotenv.config();
invariant(process.env.DISCORD_TOKEN, "DISCORD_TOKEN is required");

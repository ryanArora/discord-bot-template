import dotenv from "dotenv";
import invariant from "tiny-invariant";

dotenv.config();
invariant(process.env.DISCORD_TOKEN, "DISCORD_TOKEN is required");

console.log("Testing!", process.env["NODE_ENV"]);

let ctr = 0;
setInterval(() => {
  ctr++;
  console.log("Counter: ", ctr);
}, 1000);

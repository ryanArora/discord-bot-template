import Discord from "discord.js";
import transformClient, { extensions } from "~/client/transform";

describe("transformClient", () => {
  const client = new Discord.Client({ intents: [] });
  const transformed = transformClient(client);

  it("should return a client with the properties of ClientExtensions", () => {
    for (const extension of Object.keys(extensions)) {
      expect(transformed).toHaveProperty(extension);
    }
  });
});

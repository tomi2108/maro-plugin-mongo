import z from "zod/v4";

import { ConfigHelp, ConfigSection } from "@maro/maro";

const schema = z.object({
  credentials: z.record(
    z.string(),
    z.object({
      user: z.string(),
      password: z.string(),
      port: z.number().optional(),
      server: z.string(),
      db: z.string()
    }).optional()
  ).optional()
});

export class MongoConfig implements ConfigSection {
  key = "mongo";

  validate(config: unknown) {
    if (!config) return {};
    return schema.parse(config);
  }

  help(): ConfigHelp[] {
    return [
      { key: "credentials", description: "Namespace to MongoDB credentials map", type: "object" },
      { key: "credentials.${namespace}.user", description: "MongoDB user", type: "string" },
      { key: "credentials.${namespace}.password", description: "MongoDB password", type: "string" },
      { key: "credentials.${namespace}.port", description: "MongoDB port", type: "number" },
      { key: "credentials.${namespace}.server", description: "MongoDB server", type: "string" },
      { key: "credentials.${namespace}.db", description: "MongoDB database", type: "string" }
    ];
  }

  async setup() {
    return {};
  }

}


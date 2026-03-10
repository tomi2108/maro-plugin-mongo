import z from "zod/v4";

import { ConfigHelp, ConfigSection } from "@maro/maro";

const schema = z.object({
  secrets: z.array(z.string()).optional()
});

export class MigrationsConfig implements ConfigSection {
  key = "migrations";

  validate(config: unknown) {
    if (!config) return {};
    return schema.parse(config);
  }

  help(): ConfigHelp[] {
    return [
      { key: "secrets", description: "Secrets required for MongoDb migrations", type: "string[]" }
    ];
  }

  async setup() {
    return {};
  }

}

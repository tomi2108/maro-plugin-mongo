import z from "zod/v4";

import { ConfigSection } from "../../../dist/lib";

const schema = z.object({
  secrets: z.array(z.string()).optional()
});

export class MigrationsConfig implements ConfigSection {
  key = "migrations";

  validate(config: unknown) {
    if (!config) return {};
    return schema.parse(config);
  }

  async setup() {
    return {};
  }

}

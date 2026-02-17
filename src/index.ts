import { ConfigRegistry, PluginExport } from "@maro/maro";

import { MigrationCommand } from "./commands/migration";
import { ScriptCommand } from "./commands/script";
import { MigrationsConfig } from "./config";

const Plugin: PluginExport = {
  name: "maro-plugin-mongo",
  onLoad() {
    ConfigRegistry.register(
      new MigrationsConfig()
    );
  },
  commands: [
    {
      name: "mongo",
      description: "Run MongoDb scripts and migrations",
      subcommands: [
        MigrationCommand,
        ScriptCommand
      ]
    }
  ]
};

export default Plugin;

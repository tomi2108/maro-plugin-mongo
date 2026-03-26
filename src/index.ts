import { ConfigRegistry, PathRegistry, PluginExport } from "@maro/maro";

import { MigrationCommand } from "./commands/migration";
import { ScriptCommand } from "./commands/script";
import { MigrationsConfig } from "./config/migrations";
import { MongoConfig } from "./config/mongo";
import { ListCommand } from "./commands/list";

const Plugin: PluginExport = {
  name: "maro-plugin-mongo",
  onLoad() {
    PathRegistry.register("mongo", "Path to Mongo scripts and migrations repositories")
    ConfigRegistry.register(new MigrationsConfig());
    ConfigRegistry.register(new MongoConfig());
  },
  commands: [
    {
      name: "mongo",
      description: "Run MongoDb scripts and migrations",
      subcommands: [
        MigrationCommand,
        ScriptCommand,
        ListCommand
      ]
    }
  ]
};

export default Plugin;

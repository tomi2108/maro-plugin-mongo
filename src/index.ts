import { MigrationCommand } from "./commands/migration";
import { ScriptCommand } from "./commands/script";
import { MigrationsConfig } from "./config";
import { PluginExport } from "../../../dist/lib";

const Plugin: PluginExport = {
  name: "maro-plugin-mongo",
  configs: [
    new MigrationsConfig()
  ],
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

import { MigrationCommand } from "./commands/migration";
import { ScriptCommand } from "./commands/script";

export default {
  name: "maro-plugin-mongo",
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

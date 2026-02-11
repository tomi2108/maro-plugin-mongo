import { Command, CreateLogFile, PromptOcProject, Workflow } from "@maro/maro";
import { PromptMongoFile } from "../steps/PromptMongoFile";
import { RunMongoFile } from "../steps/RunMongoFile";

export const MigrationCommand: Command = {
  name: "migration",
  aliases: ["migrations"],
  description: "Run MongoDb migrations",
  run({ ctx }) {
    new Workflow([
      new PromptMongoFile({ type: "migrations" }),
      new PromptOcProject({ server: "cuyo" }),
      new RunMongoFile(),
      new CreateLogFile()
    ]).run(ctx);
  }
};

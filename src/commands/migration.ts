import { Command, CreateLogFile, Workflow } from "@maro/maro";
import { PromptMongoFile } from "../steps/PromptMongoFile";
import { RunMongoFile } from "../steps/RunMongoFile";
import { PromptOcProject, PromptOcServer } from "maro-plugin-oc"

export const MigrationCommand: Command = {
  name: "migration",
  aliases: ["migrations"],
  description: "Run MongoDb migrations",
  run({ ctx }) {
    new Workflow([
      new PromptMongoFile({ type: "migrations" }),
      new PromptOcServer(),
      new PromptOcProject(),
      new RunMongoFile(),
      new CreateLogFile()
    ]).run(ctx);
  }
};

import { Command, CreateLogFile, PromptOcProject, Workflow } from "@maro/maro";

import { PromptMongoFile } from "../steps/PromptMongoFile";
import { RunMongoFile } from "../steps/RunMongoFile";

export const ScriptCommand: Command = {
  name: "script",
  aliases: ["scripts"],
  description: "Run MongoDb scripts",
  run({ ctx }) {
    new Workflow([
      new PromptMongoFile({ type: "scripts" }),
      new PromptOcProject({ server: "cuyo" }),
      new RunMongoFile(),
      new CreateLogFile()
    ]).run(ctx);

  }
};

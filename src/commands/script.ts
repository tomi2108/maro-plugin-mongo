import { Command, CreateLogFile, Workflow } from "@maro/maro";

import { PromptMongoFile } from "../steps/PromptMongoFile";
import { RunMongoFile } from "../steps/RunMongoFile";

import { PromptOcProject, PromptOcServer } from "maro-plugin-oc"

export const ScriptCommand: Command = {
  name: "script",
  aliases: ["scripts"],
  description: "Run MongoDb scripts",
  run({ ctx }) {
    new Workflow([
      new PromptMongoFile({ type: "scripts" }),
      new PromptOcServer(),
      new PromptOcProject(),
      new RunMongoFile(),
      new CreateLogFile()
    ]).run(ctx);

  }
};

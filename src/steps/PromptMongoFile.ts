import {
  Config,
  Dir,
  ExecutionContext,
  TextFile,
  ValidateConfig,
  WorkflowOptions,
  WorkflowStep
} from "@maro/maro";

type Writes = { mongo_file: TextFile };
type Options = {
  type: "scripts" | "migrations";
};

export class PromptMongoFile extends WorkflowStep<never, Writes, Options> {

  constructor(
    override options: WorkflowOptions<Options, Writes>
  ) {
    super(options);
  }

  async run(ctx: ExecutionContext) {
    const config = Config.getView();
    new ValidateConfig({ keys: ["paths.mongo"] }).run();
    const mongo_path = config.get("paths.mongo");
    const dir = new Dir(mongo_path);
    const scripts_dir = dir.sub("src", this.options.type);
    const files = scripts_dir.readFiles();
    const mongo_file = await ctx.ui.promptChoice(files, { message: "Choose script" });
    return { mongo_file };
  }
}

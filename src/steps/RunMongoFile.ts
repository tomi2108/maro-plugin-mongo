import {
  AppRepo,
  CommandRunner,
  Config,
  Dir,
  ExecutionContext,
  TextFile,
  ValidateConfig,
  WorkflowStep
} from "@maro/maro";

import{ Project, PromptOcSecrets } from "maro-plugin-oc"

type Reads = {
  mongo_file: TextFile;
  project: Project;
};
type Writes = {
  log_file: { name: string; dir: Dir; log: string };
};

export class RunMongoFile extends WorkflowStep<Reads, Writes> {

  async run(ctx: ExecutionContext, { mongo_file, project }: Reads) {
    new ValidateConfig({ keys: ["paths.mongo"] }).run();
    const config = Config.getView();
    const mongo_path = config.get("paths.mongo");
    const migration_secrets = config.get("migrations.secrets") ?? [];

    const dir = new Dir(mongo_path);
    const repo = new AppRepo(dir);

    if (!dir.sub("node_modules").exists()) await repo.install();
    const projectSecrets = await project.getSecrets();
    const migrationSecrets = projectSecrets.filter((s) => migration_secrets.includes(s.name))

    const { secrets } = await new PromptOcSecrets({
      filter: (secret) => !migration_secrets.includes(secret.name),
      multiple: true
    }).run(ctx, { project })

    const env = (
      await Promise.all(
        [...secrets, ...migrationSecrets]
          .map((s) => s.getData()
          )
      )).reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const output = await new CommandRunner(process.execPath)
    .append(mongo_file.path)
    .run(
      {
        env,
        supressStdout: true,
        cwd: dir
      }
    );

    const log_dir = new Dir("mongo").sub("scripts", mongo_file.name({ extension: false }));
    return { log_file: { name: new Date().toISOString(), dir: log_dir, log: output } };
  }
}


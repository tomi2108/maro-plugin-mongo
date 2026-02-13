import {
  AppRepo,
  CommandRunner,
  Config,
  Dir,
  ExecutionContext,
  Project,
  TextFile,
  ValidateConfig,
  WorkflowStep
} from "@maro/maro";

type Reads = {
  mongo_file: TextFile;
  project: Project;
};
type Writes = {
  log_file: { name: string; dir: Dir; log: string };
};

export class RunMongoFile extends WorkflowStep<Reads, Writes> {

  async run(_: ExecutionContext, { mongo_file, project }: Reads) {
    new ValidateConfig({ keys: ["paths.mongo"] }).run();
    const config = Config.getView();
    const mongo_path = config.get("paths.mongo");
    const migration_secrets = config.get("migrations.secrets") ?? [];

    const dir = new Dir(mongo_path);
    const repo = new AppRepo(dir);

    if (!dir.sub("node_modules").exists()) await repo.install();
    const secrets = await project.getSecrets();
    const env = (
      await Promise.all(
        secrets
          .filter((s) => migration_secrets.includes(s.name))
          .map((s) => s.getData()
          )
      )).reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const output = await new CommandRunner().run(
      process.execPath,
      [mongo_file.path],
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


import mongoose from "mongoose";

import { TextFile, Config, ConfigError } from "@maro/maro";

export class Mongo {
  private uri: string;

  async connect() {
    mongoose.set("debug", true);
    await mongoose.connect(this.uri);
  }

  async disconnect() {
    await mongoose.disconnect();
  }

  async getModel(file: TextFile) {
    const content = await import(file.path);
    const schema = content.default;
    if (!schema) throw new Error(`Missing schema in ${file}, export default the mongoose.schema call`);
    return mongoose.model(schema.options.collections, schema)
  }

  async getCollections() {
    const cols = mongoose.connection.db?.listCollections()
    return cols?.toArray()
  }

  constructor(project: string) {
    const mongo_config = Config.getView().get("mongo.credentials")[project];
    if (!mongo_config) throw new ConfigError(`mongo.credentials.${project}`);
    const user = mongo_config.user;
    const password = mongo_config.password;
    const port = mongo_config.port ?? 27017;
    const server = mongo_config.server;
    const db = mongo_config.db;
    const username = user && password ? `${user}:${password}@` : "";
    this.uri = `mongodb://${username}${server}:${port}/${db}?authSource=${db}`;
  }
}

import { Command, TextFile } from "@maro/maro";
import { Mongo } from "../interface/mongo";

export const ListCommand: Command = {
  name: "list",
  aliases: ["ls"],
  description: "List mongo collections",
  async run() {
    const mongo = new Mongo("movistar-empresas-int")
    await mongo.connect()

    const path = ""
    const model = await mongo.getModel(new TextFile(path))
    console.log(await model.find({}))
    await mongo.disconnect()
  }
};

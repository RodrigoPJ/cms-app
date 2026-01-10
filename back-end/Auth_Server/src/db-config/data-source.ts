import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { DataBaseParams } from "../utils/types";

export function createDataSource(dbEnv: DataBaseParams): DataSource {
  const port = parseInt(dbEnv.port || "4000");
  const AppDataSource = new DataSource({
    type: "postgres",
    host: dbEnv.host,
    port,
    username: dbEnv.username,
    password: dbEnv.password,
    database: dbEnv.database,
    synchronize: true,
    entities: [User],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  });
  return AppDataSource;
}

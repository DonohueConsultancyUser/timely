import { DataSource } from "typeorm";
import { envsConfig } from "../configs";
import Tokens from "./models/tokens.moldel";

export const dataSourse = new DataSource({
  type: "postgres",
  host: envsConfig.postgresHost,
  port: Number(envsConfig.postgresPort),
  username: envsConfig.postgresUser,
  password: envsConfig.postgresPassword,
  database: envsConfig.postgresDatabase,
  entities: [Tokens],
  synchronize: true,
  logging: false,
});

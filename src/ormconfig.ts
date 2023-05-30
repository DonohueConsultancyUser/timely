import { envsConfig } from "./configs";
import Tokens from "./database/models/tokens.moldel";

export default {
  type: "postgres",
  host: envsConfig.postgresHost,
  port: Number(envsConfig.postgresPort),
  username: envsConfig.postgresUser,
  password: envsConfig.postgresPassword,
  database: envsConfig.postgresDatabase,
  entities: [Tokens],
  synchronize: true,
  logging: false,
};

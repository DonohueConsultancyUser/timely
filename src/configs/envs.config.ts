import { config } from "dotenv";
config();

export const envsConfig = {
  port: Number(process.env.PORT),
  timelyRedirectUrl: process.env.TIMELY_REDIRECT_URL,
  timelyClientId: process.env.TIMELY_CLIENT_ID,
  timelyClientSecret: process.env.TIMELY_CLIENT_SECRET,
  teamworkToken: process.env.TEAMWORK_TOKEN,
  teamworkBaseUrl: process.env.TEAMWORK_BASE_URL,
  timelyBaseUrl: process.env.TIMELY_BASE_URL,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresHost: process.env.POSTGRES_HOST,
  postgresDatabase: process.env.POSTGRES_DATABASE,
  postgresPort: process.env.POSTGRES_PORT,
};

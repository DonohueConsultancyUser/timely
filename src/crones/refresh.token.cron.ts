import { CronJob } from "cron";
import { getTokens, timelyService } from "../services";
import { dataSourse } from "../database/connection";
import Tokens from "../database/models/tokens.moldel";
// import { promises as fs } from "fs";
// import { TokensDb } from "../models/tokens.moldel";

export const refreshTokenCrone = new CronJob("0 0 1,15 * * *", async (): Promise<void> => {
  try {
    const tokens = await getTokens();
    const { data } = await timelyService.refreshToken(tokens.refresh_token);
    await dataSourse.manager.update(
      Tokens,
      { refresh_token: tokens.refresh_token },
      { access_token: data.access_token, refresh_token: data.refresh_token }
    );
    console.log("Tokens changed");
  } catch (e: any) {
    console.log(e.message);
  }
});

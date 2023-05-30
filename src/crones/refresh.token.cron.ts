import { CronJob } from "cron";
import { getTokens, timelyService } from "../services";
import { promises as fs } from "fs";
import { TokensDb } from "../models/tokens.moldel";

export const refreshTokenCrone = new CronJob("0 0 1,15 * * *", async (): Promise<void> => {
  try {
    const tokens = await getTokens();

    const { data } = await timelyService.refreshToken(tokens.refresh_token);
    await TokensDb.updateOne(
      { refresh_token: tokens.refresh_token },
      { access_token: tokens.access_token, refresh_tokens: tokens.refresh_token }
    );
    await fs.writeFile("./src/tokens.json", JSON.stringify(data));

    console.log("Tokens changed");
  } catch (e: any) {
    console.log(e.message);
  }
});

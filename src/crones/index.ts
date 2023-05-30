import { refreshTokenCrone } from "./refresh.token.cron";

export const cronRunner = (): void => {
  refreshTokenCrone.start();
};

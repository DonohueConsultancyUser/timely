import * as express from "express";
import { teamworkRouter } from "./teamwork.router";
import { timelyRouter } from "./timely.router";

const apiRouter = express.Router();

apiRouter.use("/teamwork", teamworkRouter);
apiRouter.use("/timely", timelyRouter);

export { apiRouter };

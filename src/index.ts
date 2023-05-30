import express, { NextFunction, Response } from "express";
import { envsConfig } from "./configs";
import { apiRouter } from "./routes/api.router";
import { IRequest } from "./interfaces";
import { cronRunner } from "./crones";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

// eslint-disable-next-line no-unused-vars
app.use((err: any, req: IRequest, res: Response, next: NextFunction) => {
  console.log(err.message || "Unknown error");

  res.status(err.status || 500).json({
    errorMessage: err.message || "Unknown error",
    statusCode: err.status || 500,
  });
});

app.listen(envsConfig.port, async () => {
  await mongoose.connect(envsConfig.mongoUrl as string);
  console.log(`Port listen: ${envsConfig.port}`);
  cronRunner();
});

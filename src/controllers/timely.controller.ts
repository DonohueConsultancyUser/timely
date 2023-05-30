import { Request, Response } from "express";
import { IRequest } from "../interfaces";

export const timelyController = {
  addHours: (req: IRequest, res: Response) => {
    console.log("Hours created successfully");
    res.end();
  },
  getTokens: (req: Request, res: Response) => {
    res.send("Successfully");
  },
};

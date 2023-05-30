import { Request, Response } from "express";

export const teamworkController = {
  createProject: (req: Request, res: Response) => {
    console.log("Project created successfully");

    res.end();
  },

  createBudget: (req: Request, res: Response) => {
    console.log("Budget created successfully");

    res.end();
  },

  updateBudget: (req: Request, res: Response) => {
    console.log("Budget update successfully");

    res.end();
  },
};

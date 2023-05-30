import { NextFunction, Response } from "express";
import { timelyService } from "../services";
import { IRequest } from "../interfaces";
import { TokensDb } from "../models/tokens.moldel";

export const timelyMiddlewares = {
  createProject: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.body.project.name) {
        throw new Error("Project name not found");
      }
      if (!req.clientId) {
        throw new Error("Client id not found");
      }
      if (!req.accountId) {
        throw new Error(`Account id not found`);
      }
      if (!req.usersForCreate) {
        throw new Error(`Users id not found`);
      }
      const dataForCreate = {
        project: {
          name: req.body.project.name,
          rate_type: "project",
          color: "67a3bc",
          client_id: +req.clientId,
          users: req.usersForCreate,
        },
      };
      await timelyService.createProject(req.accountId, dataForCreate);
      next();
    } catch (e) {
      next(e);
    }
  },

  updateProjectBudget: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.accountId) {
        throw new Error("Account id not found");
      }
      if (!req.projectId) {
        throw new Error("Project id not found");
      }
      const body = {
        budget: 0,
        budget_type: "",
      };
      if (req.body.budget.type === "TIME") {
        body.budget_type = "H";
        body.budget = req.body.budget.capacity / 60;
      } else {
        body.budget_type = "M";
        body.budget = req.body.budget.capacity / 100;
      }

      await timelyService.updateProjectBudget(req.accountId, req.projectId, body);
      next();
    } catch (e) {
      next(e);
    }
  },

  getAccount: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const { data } = await timelyService.getAccounts();
      req.accountId = data[0].id;
      next();
    } catch (e) {
      next(e);
    }
  },

  generateHoursData: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const accountId = req.accountId;
      if (!accountId) {
        throw new Error("Missing accountId");
      }
      const path = req.body.payload.entity_path;

      const { data: createdHours } = await timelyService.getCreatedHours(path, accountId);

      if (!createdHours) {
        throw new Error("Created hours not found");
      }
      const userEmail = createdHours.user.email;
      const date = createdHours.day;
      const description = createdHours.note;
      let hours = createdHours.duration.hours;
      let minutes = createdHours.duration.minutes;
      const projectName = createdHours.project.name;

      if (minutes < 20) {
        minutes = 20;
      } else if (minutes > 30) {
        const remainder = minutes % 15;
        let roundedMinutes = minutes - remainder;
        if (remainder > 7.5) {
          roundedMinutes += 15;
        }
        minutes = roundedMinutes;
      }
      if (minutes === 60) {
        hours += 1;
        minutes = 0;
      }

      const hoursDate = {
        userEmail,
        date,
        description,
        hours,
        minutes,
        projectName,
      };
      req.hours = hoursDate;
      next();
    } catch (e) {
      next(e);
    }
  },

  getTimelyProjectByName: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.accountId) {
        throw new Error("Account id not foind");
      }
      if (!req.projectName) {
        throw new Error("Project name not found");
      }
      const { data } = await timelyService.getProjects(req.accountId);

      const project = data.find((project) => project.name === req.projectName);
      if (!project) {
        throw new Error("Project not found");
      }
      req.projectId = project.id;
      next();
    } catch (e) {
      next(e);
    }
  },

  setProjectBudget: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.accountId) {
        throw new Error("Account id not found");
      }
      if (!req.projectId) {
        throw new Error("Project id not found");
      }
      const body = {
        budget: 0,
        budget_type: "",
      };
      if (req.body.budget.type === "TIME") {
        body.budget_type = "H";
        body.budget = req.body.budget.capacity / 60;
      } else {
        body.budget_type = "M";
        body.budget = req.body.budget.capacity / 100;
      }
      await timelyService.setProjectBudget(req.accountId, req.projectId, body);
      next();
    } catch (e) {
      next(e);
    }
  },

  getClient: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.accountId) {
        throw new Error("Account id not found");
      }
      const { data } = await timelyService.getClients(req.accountId);
      const clientId = data[0].id;
      req.clientId = clientId;
      next();
    } catch (e) {
      next(e);
    }
  },

  getUsersArr: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.accountId) {
        throw new Error("Account Id not found");
      }
      const { data } = await timelyService.getPeopleByAccountId(req.accountId);
      if (!data) {
        throw new Error("People not found");
      }
      const usersForCreate = data
        .map((user) => {
          if (user.id && req.people?.includes(user.email)) {
            return { user_id: +user.id };
          }
        })
        .filter((elem): elem is { user_id: number } => elem !== undefined);
      req.usersForCreate = usersForCreate;
      next();
    } catch (e) {
      next(e);
    }
  },

  getTokens: async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const code = req.query.code as string;
      await TokensDb.deleteMany();
      const { data } = await timelyService.getTokens(code);
      await TokensDb.create({ access_token: data.access_token, refresh_token: data.refresh_token });
      next();
    } catch (e) {
      next(e);
    }
  },
};

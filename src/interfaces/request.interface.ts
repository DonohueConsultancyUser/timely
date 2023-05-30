import { Request } from "express";

export interface IRequest extends Request {
  accountId?: number;
  hours?: {
    userEmail: string;
    date: Date;
    description: string;
    hours: number;
    minutes: number;
    projectName: string;
  };
  projectName?: string;
  userId?: number;
  usersForCreate?: { user_id: number }[];
  projectId?: number;
  clientId?: number;
  people?: string[];
}

import axios, { AxiosResponse } from "axios";
import { envsConfig, teamworkUrls } from "../configs";
import { CreateHoursI } from "../interfaces";
import { ProjectsResponseI, TeamworkHoursI, TeamworkPeopleI, TeamworkProjectI } from "../interfaces/teamwork";

const axiosService = axios.create({ baseURL: envsConfig.teamworkBaseUrl });

export const teamworkService = {
  getPeople: (): Promise<AxiosResponse<{ people: TeamworkPeopleI[] }>> => axiosService.get(`${teamworkUrls.people}.json`),
  getPeopleByProject: (projectId: number): Promise<AxiosResponse<{ people: TeamworkPeopleI[] }>> =>
    axiosService.get(`${teamworkUrls.projects}/${projectId}${teamworkUrls.people}.json`),
  getProjectById: (id: number): Promise<AxiosResponse<ProjectsResponseI>> =>
    axiosService.get(`${teamworkUrls.projects}/${id}.json`),
  getProjects: (): Promise<AxiosResponse<{ projects: TeamworkProjectI[] }>> => axiosService.get(`${teamworkUrls.projects}.json`),
  createHours: (data: CreateHoursI, projectId: number): Promise<AxiosResponse<TeamworkHoursI>> =>
    axiosService.post(`${teamworkUrls.projects}/api/v3/projects/${projectId}/time.json`, data),
};

axiosService.interceptors.request.use((config) => {
  config.headers.Authorization = "Basic " + Buffer.from(`${envsConfig.teamworkToken}` + ":" + "password").toString("base64");
  return config;
});

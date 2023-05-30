export interface TeamworkHoursI {
  timelog: {
    description: string;
    hasStartTime: boolean;
    hours: number;
    invoiceId: number;
    isBillable: boolean;
    minutes: number;
    projectId: number;
    taskId: number;
    ticketId: number;
    userId: number;
  };
}

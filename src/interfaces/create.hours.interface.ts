export interface CreateHoursI {
  timelog: {
    date: Date;
    description: string;
    isBillable: boolean;
    hours: number;
    minutes: number;
    userId: number;
  };
}

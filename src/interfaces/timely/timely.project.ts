export interface TimelyProjectI {
  id: number;
  name: string;
  rate_type: string;
  hour_rate: number;
  active: boolean;
  deleted: false;
  currency_code: string;
  color: string;
  enable_labels: string;
  lock_hours_in: number;
  client_id: number;
  budget_type: string;
  budget: number;
  users: [{ user_id: number }];
}

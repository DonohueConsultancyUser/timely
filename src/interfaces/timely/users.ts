export interface TimelyUsersI {
  id: number;
  email: string;
  name: string;
  active: boolean;
  created_at: number;
  updated_at: number;
  type: string;
  user_level: string;
  admin: boolean;
  deleted: boolean;
  default_hour_rate: number;
  internal_hour_rate: number;
  role_id: number;
  role: {
    id: number;
    name: string;
  };
}

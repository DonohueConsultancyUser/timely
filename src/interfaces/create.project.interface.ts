export interface CreateProjectI {
  project: {
    name: string;
    rate_type: string;
    color: string;
    client_id: number;
    users: { user_id: number }[];
  };
}

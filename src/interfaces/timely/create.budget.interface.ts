export interface CreateBudgetI {
  project: {
    budget: number;
    budget_type: string;
    budget_recurrence?: {
      recur: string;
      start_date: string;
      end_date: string | null;
      recur_until: string;
    };
    has_recurrence?: boolean;
  };
}

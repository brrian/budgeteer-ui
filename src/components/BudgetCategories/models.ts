export interface BudgetCategory {
  label: string;
  limit: number;
  spending: number;
}

export interface Category {
  categoryId: string;
  limit: number;
}

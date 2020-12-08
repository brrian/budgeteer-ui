import { useMemo } from 'react';
import { Budget, Transactions } from '../../../graphql/models';
import useCategories from '../../../util/hooks/useCategories';
import useTranslation from '../../../util/hooks/useTranslation';
import { BudgetCategory } from '../models';

export default function useBudgetCategories(
  budget: Budget,
  transactions: Transactions
): BudgetCategory[] {
  const { t } = useTranslation();

  const categoryMap = useCategories();

  return useMemo(() => {
    let otherCategoryLimit = budget.total;

    const categories = new Map<string, BudgetCategory>();

    // Populate categories based on budget
    for (const { categoryId, limit } of budget.categories) {
      otherCategoryLimit -= limit;

      categories.set(categoryId, {
        label: categoryMap.get(categoryId) ?? t('unknownCategory'),
        limit,
        spending: 0,
      });
    }

    // Add the "other" catch-all category if necessary
    if (otherCategoryLimit > 0) {
      categories.set('__other__', {
        label: t('other'),
        limit: otherCategoryLimit,
        spending: 0,
      });
    }

    const addSpending = (categoryId: string, amount: number) => {
      const categoryKey = categories.has(categoryId) ? categoryId : '__other__';

      const category = categories.get(categoryKey);
      if (category) {
        category.spending += amount;
        categories.set(categoryKey, category);
      }
    };

    // Calculate spending based on transaction category
    transactions.forEach(transaction => {
      if (!transaction.disabled) {
        addSpending(transaction.categoryId, transaction.amount);
      }

      for (const split of transaction.splits) {
        if (!split.disabled) {
          addSpending(split.categoryId, split.amount);
        }
      }
    });

    return Array.from(categories.values());
  }, [budget, transactions]);
}

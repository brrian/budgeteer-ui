const COLLAPSED_HEIGHT = 40;
const EXPANDED_HEIGHT_BASE = COLLAPSED_HEIGHT + 12 + 2; // Includes margin and border height
const EXPANDED_HEIGHT_CATEGORY = 58;

export default function getBudgetCategoriesHeight(
  isExpanded: boolean,
  categoriesCount: number
): number {
  return isExpanded
    ? EXPANDED_HEIGHT_BASE + categoriesCount * EXPANDED_HEIGHT_CATEGORY
    : COLLAPSED_HEIGHT;
}

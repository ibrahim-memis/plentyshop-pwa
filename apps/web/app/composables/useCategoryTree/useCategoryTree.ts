import { markRaw } from 'vue';
import type { CategoryTreeItem } from '@plentymarkets/shop-api';

import type { UseCategoryTreeState, UseCategoryTreeMethodsReturn, GetCategoryTree, SetCategoryTree } from './types';

const freezeTree = (items: CategoryTreeItem[]): CategoryTreeItem[] => {
  for (const item of items) {
    markRaw(item);
    if (item.details?.length) {
      for (const detail of item.details) markRaw(detail);
    }
    if (item.children?.length) freezeTree(item.children);
  }
  return items;
};

/**
 * @description Composable for managing the category tree.
 * @returns UseCategoryTreeMethodsReturn
 * @example
 * ``` ts
 * const { data, loading, getCategoryTree } = useCategoryTree();
 * ```
 */
export const useCategoryTree: UseCategoryTreeMethodsReturn = () => {
  const state = useState<UseCategoryTreeState>('useCategoryTree', () => ({
    data: [] as CategoryTreeItem[],
    loading: false,
  }));

  /**
   * @description Function for fetching the category tree.
   * @example
   * ``` ts
   * getCategoryTree();
   * ```
   */
  const getCategoryTree: GetCategoryTree = async () => {
    state.value.loading = true;
    try {
      const data = await useSdk().plentysystems.getCategoryTree();
      state.value.data = data?.data ? freezeTree(data.data) : state.value.data;
      return state.value.data;
    } catch (error) {
      throw new Error(error as string);
    } finally {
      state.value.loading = false;
    }
  };

  /**
   * @description Function for setting the category tree data.
   * @example
   * ``` ts
   * setCategoryTree();
   * ```
   */
  const setCategoryTree: SetCategoryTree = (data: CategoryTreeItem[]) => {
    state.value.data = freezeTree(data);
  };

  return {
    getCategoryTree,
    setCategoryTree,
    ...toRefs(state.value),
  };
};

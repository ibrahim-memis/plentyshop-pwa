<template>
  <div v-if="subcategories.length" data-testid="subcategory-bar-block">
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8 pb-2">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <NuxtLink
          v-for="sub in subcategories"
          :key="sub.id"
          :to="localePath(sub.link)"
          class="group flex items-center gap-3 px-4 py-3 rounded-lg border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm transition-all duration-150"
        >
          <div class="w-9 h-9 rounded-full overflow-hidden bg-neutral-50 flex-shrink-0 flex items-center justify-center">
            <img
              v-if="sub.imageUrl"
              :src="sub.imageUrl"
              :alt="sub.name"
              class="w-full h-full object-cover"
              loading="lazy"
            >
            <svg v-else class="w-4 h-4 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
            </svg>
          </div>
          <span class="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors truncate">
            {{ sub.name }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { categoryGetters } from '@plentymarkets/shop-api';
import type { CategoryTreeItem } from '@plentymarkets/shop-api';

interface SubcategoryBarProps {
  content?: Record<string, unknown>;
  meta?: { uuid: string };
}

defineProps<SubcategoryBarProps>();
const localePath = useLocalePath();
const { data: productsCatalog } = useProducts();
const { data: categoryTree } = useCategoryTree();
const { buildDocumentUrl } = useBuildImageUrl();
const { buildCategoryMenuLink } = useLocalization();

interface SubcategoryItem {
  id: number;
  name: string;
  link: string;
  imageUrl: string;
}

const findCategoryInTree = (cats: CategoryTreeItem[], targetId: number): CategoryTreeItem | null => {
  for (const cat of cats) {
    if (cat.id === targetId) return cat;
    if (cat.children?.length) {
      const found = findCategoryInTree(cat.children, targetId);
      if (found) return found;
    }
  }
  return null;
};

const subcategories = computed((): SubcategoryItem[] => {
  const currentCatId = categoryGetters.getId(productsCatalog.value.category);
  if (!currentCatId || !categoryTree.value?.length) return [];

  const currentCat = findCategoryInTree(categoryTree.value, currentCatId);
  if (!currentCat?.children?.length) return [];

  return currentCat.children
    .filter((child: CategoryTreeItem) => child.type === 'item' && child.details?.[0]?.name)
    .map((child: CategoryTreeItem) => {
      const detail = child.details?.[0];
      const imgPath = detail?.imagePath || detail?.image2Path || '';
      return {
        id: child.id,
        name: String(detail?.name || ''),
        link: buildCategoryMenuLink(child, categoryTree.value) || '/',
        imageUrl: imgPath ? buildDocumentUrl(imgPath) : '',
      };
    });
});
</script>

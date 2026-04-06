<template>
  <div v-if="brands.length" data-testid="brands-showcase-block" class="bg-white">
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8 py-12 md:py-16">
      <div class="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
            {{ t('brandsShowcase.title') }}
          </h2>
          <p class="mt-2 text-sm md:text-base text-neutral-600">
            {{ t('brandsShowcase.subtitle') }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <NuxtLink
          v-for="brand in brands"
          :key="brand.id"
          :to="localePath(brand.link)"
          class="group flex flex-col items-center justify-center p-6 md:p-8 rounded-xl border border-neutral-200 bg-white shadow-sm hover:border-[#384d37]/30 hover:shadow-lg hover:shadow-[#384d37]/5 transition-all duration-300 aspect-[2/1]"
        >
          <div class="relative w-full h-full flex items-center justify-center">
            <img
              v-if="brand.logoUrl"
              :src="brand.logoUrl"
              :alt="brand.name"
              class="max-h-12 md:max-h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            >
            <span
              v-else
              class="text-lg md:text-xl font-bold text-neutral-500 group-hover:text-[#384d37] uppercase tracking-wider transition-colors"
            >
              {{ brand.name }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryTreeItem } from '@plentymarkets/shop-api';

interface BrandsShowcaseProps {
  content?: {
    maxBrands?: number;
    parentCategoryName?: string;
  };
  meta?: { uuid: string };
}

interface BrandItem {
  id: number;
  name: string;
  logoUrl: string;
  link: string;
}

const props = defineProps<BrandsShowcaseProps>();
const localePath = useLocalePath();
const { t } = useI18n();
const { buildDocumentUrl } = useBuildImageUrl();
const { buildCategoryMenuLink } = useLocalization();

const maxBrands = computed(() => props.content?.maxBrands ?? 100);
const parentName = computed(() => (props.content?.parentCategoryName || 'marken').toLowerCase());
const { data: categoryTree } = useCategoryTree();

const findMarkenCategory = (cats: CategoryTreeItem[]): CategoryTreeItem | undefined => {
  for (const cat of cats) {
    const name = (cat.details?.[0]?.name || '').toLowerCase();
    const url = (cat.details?.[0]?.nameUrl || '').toLowerCase();
    if (name.includes(parentName.value) || url.includes(parentName.value)) return cat;
    if (cat.children?.length) {
      const found = findMarkenCategory(cat.children);
      if (found) return found;
    }
  }
  return undefined;
};

const brands = computed((): BrandItem[] => {
  if (!categoryTree.value?.length) return [];

  const markenCat = findMarkenCategory(categoryTree.value);
  if (!markenCat?.children?.length) return [];

  const seen = new Set<string>();
  return markenCat.children
    .filter((child: CategoryTreeItem) => {
      if (child.type !== 'item') return false;
      const detail = child.details?.[0];
      const imgPath = detail?.imagePath || detail?.image2Path || '';
      if (!imgPath) return false;
      const name = (detail?.name || '').toLowerCase();
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    })
    .slice(0, maxBrands.value)
    .map((child: CategoryTreeItem) => {
      const detail = child.details?.[0];
      const imgPath = detail?.imagePath || detail?.image2Path || '';
      return {
        id: child.id,
        name: String(detail?.name || `Brand ${child.id}`),
        logoUrl: buildDocumentUrl(imgPath),
        link: buildCategoryMenuLink(child, categoryTree.value) || '/',
      };
    });
});
</script>

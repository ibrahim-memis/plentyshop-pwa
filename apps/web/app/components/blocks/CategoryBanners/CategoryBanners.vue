<template>
  <div data-testid="category-banners-block" class="bg-neutral-50/50">
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8 py-12 md:py-16">
      <div class="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
            {{ t('categoryBanners.title') }}
          </h2>
          <p class="mt-2 text-sm md:text-base text-neutral-600">
            {{ t('categoryBanners.subtitle') }}
          </p>
        </div>
        <NuxtLink
          :to="localePath('/')"
          class="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[#384d37] hover:text-[#2c3e2b] transition-colors shrink-0 group"
        >
          {{ t('categoryBanners.viewAll') }}
          <svg class="w-4 h-4 transform transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>
      </div>

      <div v-if="visibleCategories.length" class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        <NuxtLink
          v-for="(cat, idx) in visibleCategories"
          :key="cat.id"
          :to="localePath(cat.link)"
          class="relative rounded-xl overflow-hidden group aspect-square block border border-neutral-200 shadow-sm hover:shadow-xl hover:border-[#384d37]/30 hover:ring-2 hover:ring-[#384d37]/10 transition-all duration-300"
        >
          <div class="absolute inset-0 w-full h-full" :style="{ background: gradients[idx % gradients.length] }" />
          <img
            v-if="cat.imageUrl"
            :src="cat.imageUrl"
            :alt="cat.name"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-[#384d37]/90 via-[#384d37]/30 to-transparent group-hover:from-[#384d37]/95 transition-colors" />
          <div class="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
            <h3 class="text-sm md:text-base font-bold text-white leading-tight drop-shadow-lg">
              {{ cat.name }}
            </h3>
            <span class="mt-1.5 text-xs font-semibold text-white/90 group-hover:text-white transition-colors inline-flex items-center gap-1">
              {{ t('categoryShowcase.explore') }}
              <svg class="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </NuxtLink>
      </div>

      <NuxtLink
        :to="localePath('/')"
        class="md:hidden flex items-center justify-center gap-1.5 mt-8 text-sm font-semibold text-[#384d37] hover:text-[#2c3e2b] transition-colors"
      >
        {{ t('categoryBanners.viewAll') }}
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryTreeItem } from '@plentymarkets/shop-api';

interface CategoryBannersProps {
  content?: {
    maxBanners?: number;
    excludeNames?: string[];
    includeNames?: string[];
  };
  meta?: { uuid: string };
}

const props = defineProps<CategoryBannersProps>();
const localePath = useLocalePath();
const { t } = useI18n();
const { buildDocumentUrl } = useBuildImageUrl();

const maxBanners = computed(() => props.content?.maxBanners ?? 4);
const excludeNames = computed(() => (props.content?.excludeNames || []).map((n) => n.toLowerCase()));
const includeNames = computed(() => (props.content?.includeNames || []).map((n) => n.toLowerCase()));
const { data: categoryTree } = useCategoryTree();
const { buildCategoryMenuLink } = useLocalization();

const gradients = [
  'linear-gradient(135deg, #384d37 0%, #2c3e2b 100%)',
  'linear-gradient(135deg, #4a6741 0%, #384d37 100%)',
  'linear-gradient(135deg, #2c3e2b 0%, #1e2d1d 100%)',
  'linear-gradient(135deg, #3d5c3a 0%, #2a4028 100%)',
  'linear-gradient(135deg, #536b50 0%, #384d37 100%)',
];

interface CategoryBannerItem {
  id: number;
  name: string;
  link: string;
  imageUrl: string;
}

const flattenCategories = (cats: CategoryTreeItem[]): CategoryTreeItem[] => {
  const result: CategoryTreeItem[] = [];
  const walk = (list: CategoryTreeItem[]) => {
    for (const cat of list) {
      result.push(cat);
      if (cat.children?.length) walk(cat.children);
    }
  };
  walk(cats);
  return result;
};

const visibleCategories = computed((): CategoryBannerItem[] => {
  if (!categoryTree.value?.length) return [];

  const allCats = flattenCategories(categoryTree.value);

  if (includeNames.value.length) {
    const matched: CategoryBannerItem[] = [];
    const usedIds = new Set<number>();

    for (const targetName of includeNames.value) {
      const found = allCats.find((cat) => {
        if (usedIds.has(cat.id)) return false;
        const detail = cat.details?.[0];
        const name = (detail?.name || '').toLowerCase();
        const url = (detail?.nameUrl || '').toLowerCase();
        return name.includes(targetName) || url.includes(targetName);
      });
      if (found) {
        usedIds.add(found.id);
        const detail = found.details?.[0];
        const imgPath = detail?.imagePath || detail?.image2Path || '';
        matched.push({
          id: found.id,
          name: String(detail?.name || `Category ${found.id}`),
          link: buildCategoryMenuLink(found, categoryTree.value) || '/',
          imageUrl: buildDocumentUrl(imgPath),
        });
      }
    }
    return matched.slice(0, maxBanners.value);
  }

  return allCats
    .filter((cat: CategoryTreeItem) => {
      if (cat.type !== 'item') return false;
      const name = (cat.details?.[0]?.name || '').toLowerCase();
      return !excludeNames.value.some((ex) => name.includes(ex));
    })
    .slice(0, maxBanners.value)
    .map((cat: CategoryTreeItem) => {
      const detail = cat.details?.[0];
      const imgPath = detail?.imagePath || detail?.image2Path || '';
      return {
        id: cat.id,
        name: String(detail?.name || `Category ${cat.id}`),
        link: buildCategoryMenuLink(cat, categoryTree.value) || '/',
        imageUrl: buildDocumentUrl(imgPath),
      };
    });
});
</script>

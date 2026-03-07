<template>
  <div :style="inlineStyle" data-testid="category-showcase-block" class="bg-white">
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8">
      <div v-for="(section, idx) in categorySections" :key="section.categoryId" class="mb-14 last:mb-0">
        <!-- Alt kategori kartları (3'lü kare) -->
        <div v-if="sectionSubcategories[idx]?.length" class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-8">
          <NuxtLink
            v-for="(sub, sIdx) in sectionSubcategories[idx].slice(0, 3)"
            :key="sub.id"
            :to="localePath(sub.link)"
            class="relative rounded-xl overflow-hidden group aspect-square block border border-neutral-200 shadow-sm hover:shadow-xl hover:border-[#384d37]/30 hover:ring-2 hover:ring-[#384d37]/10 transition-all duration-300"
          >
            <div class="absolute inset-0 w-full h-full" :style="{ background: subGradients[sIdx % subGradients.length] }" />
            <img
              v-if="sub.imageUrl"
              :src="sub.imageUrl"
              :alt="sub.name"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-[#384d37]/90 via-[#384d37]/30 to-transparent group-hover:from-[#384d37]/95 transition-colors" />
            <div class="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
              <h4 class="text-sm md:text-base font-bold text-white leading-tight drop-shadow-lg">
                {{ sub.name }}
              </h4>
              <span class="mt-1.5 text-xs font-semibold text-white/90 group-hover:text-white transition-colors inline-flex items-center gap-1">
                {{ t('categoryShowcase.explore') }}
                <svg class="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>

        <div class="flex items-end justify-between mb-6">
          <h3 class="text-xl md:text-2xl font-bold text-neutral-900 tracking-tight">
            {{ section.title }}
          </h3>
          <NuxtLink
            v-if="section.link"
            :to="localePath(section.link)"
            class="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[#384d37] hover:text-[#2c3e2b] transition-colors shrink-0 group"
          >
            {{ t('categoryShowcase.viewAll') }}
            <svg class="w-4 h-4 transform transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>

        <div v-if="sectionProducts[idx]?.length" class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <UiProductCard
            v-for="(product, pIdx) in sectionProducts[idx].slice(0, 4)"
            :key="productGetters.getVariationId(product)"
            :product="product"
            :configuration="cardConfig"
            :index="pIdx"
          />
        </div>

        <div v-else-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="i in 4" :key="i" class="bg-neutral-50 rounded-lg border border-neutral-100 animate-pulse">
            <div class="aspect-square bg-neutral-100 rounded-t-lg" />
            <div class="p-4 space-y-3">
              <div class="h-3 bg-neutral-100 rounded w-3/4" />
              <div class="h-3 bg-neutral-100 rounded w-1/2" />
              <div class="h-5 bg-neutral-100 rounded w-1/3" />
            </div>
          </div>
        </div>

        <NuxtLink
          v-if="section.link"
          :to="localePath(section.link)"
          class="md:hidden flex items-center justify-center gap-1.5 mt-6 text-sm font-semibold text-[#384d37] hover:text-[#2c3e2b] transition-colors"
        >
          {{ t('categoryShowcase.viewAll') }}
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import type { Product, CategoryTreeItem } from '@plentymarkets/shop-api';
import type { ItemGridFieldKey } from '~/components/blocks/ItemGrid/types';

interface CategorySection {
  categoryId: string;
  title: string;
  link?: string;
  linkText?: string;
}

interface CategoryShowcaseProps {
  content: {
    text?: { title?: string };
    categories?: CategorySection[];
    autoDetect?: boolean;
    maxCategories?: number;
    maxItemsPerCategory?: number;
    excludeNames?: string[];
    layout?: {
      paddingTop?: number;
      paddingBottom?: number;
      paddingLeft?: number;
      paddingRight?: number;
    };
  };
  meta: { uuid: string };
}

const props = defineProps<CategoryShowcaseProps>();
const localePath = useLocalePath();
const { t } = useI18n();

const maxItemsPerCategory = computed(() => props.content.maxItemsPerCategory ?? 4);
const maxCategories = computed(() => props.content.maxCategories ?? 6);
const excludeNames = computed(() => (props.content.excludeNames || []).map((n) => n.toLowerCase()));

const { data: categoryTree } = useCategoryTree();
const { buildCategoryMenuLink } = useLocalization();
const loading = ref(false);

const subGradients = [
  'linear-gradient(135deg, #384d37 0%, #2c3e2b 100%)',
  'linear-gradient(135deg, #4a6741 0%, #384d37 100%)',
  'linear-gradient(135deg, #2c3e2b 0%, #1e2d1d 100%)',
];

const cardConfig = {
  itemsPerRowDesktop: 4,
  itemsPerRowTablet: 3,
  itemsPerRowMobile: 2,
  showItemCount: false,
  itemCountPosition: 'left' as const,
  cardBorders: true,
  contentAlignment: 'left' as const,
  fields: { title: true, rating: true, previewText: false, price: true, addToCart: true, manufacturer: false },
  fieldsOrder: ['title' as const, 'rating' as const, 'price' as const, 'addToCart' as const],
  fieldsDisabled: [] as ItemGridFieldKey[],
  showWishlistButton: true,
  showSecondImageOnHover: false,
  addToCartStyle: 'primary' as const,
  paginationPosition: 'bottom' as const,
  layout: { fullWidth: false },
};

const categorySections = computed((): CategorySection[] => {
  if (props.content.categories?.length) {
    return props.content.categories;
  }

  if (!categoryTree.value?.length) return [];

  return categoryTree.value
    .filter((cat: CategoryTreeItem) => {
      if (cat.type !== 'item') return false;
      const name = (cat.details?.[0]?.name || '').toLowerCase();
      return !excludeNames.value.some((ex) => name.includes(ex));
    })
    .slice(0, maxCategories.value)
    .map((cat: CategoryTreeItem) => ({
      categoryId: String(cat.id),
      title: cat.details?.[0]?.name || `Category ${cat.id}`,
      link: buildCategoryMenuLink(cat, categoryTree.value) || undefined,
    }));
});

interface SubcategoryItem {
  id: number;
  name: string;
  link: string;
  imageUrl: string;
}

const { buildDocumentUrl } = useBuildImageUrl();

const sectionSubcategories = computed((): SubcategoryItem[][] => {
  if (!categoryTree.value?.length) return [];

  return categorySections.value.map((section) => {
    const findCat = (cats: CategoryTreeItem[]): CategoryTreeItem | undefined => {
      for (const cat of cats) {
        if (String(cat.id) === section.categoryId) return cat;
        if (cat.children?.length) {
          const found = findCat(cat.children);
          if (found) return found;
        }
      }
      return undefined;
    };

    const parentCat = findCat(categoryTree.value);
    if (!parentCat?.children?.length) return [];

    return parentCat.children
      .filter((child: CategoryTreeItem) => child.type === 'item')
      .slice(0, 3)
      .map((child: CategoryTreeItem) => {
        const detail = child.details?.[0];
        const imgPath = detail?.imagePath || detail?.image2Path || '';
        return {
          id: child.id,
          name: String(detail?.name || `Subcategory ${child.id}`),
          link: buildCategoryMenuLink(child, categoryTree.value) || '/',
          imageUrl: buildDocumentUrl(imgPath),
        };
      });
  });
});

const sectionProducts = ref<Product[][]>([]);

const fetchCategoryProducts = async () => {
  if (!categorySections.value.length) return;

  loading.value = true;
  const results: Product[][] = [];

  for (const section of categorySections.value) {
    try {
      const response = await useSdk().plentysystems.getFacet({
        categoryId: section.categoryId,
        itemsPerPage: maxItemsPerCategory.value,
        sort: 'sorting.price.avg_asc',
        type: 'category',
      });
      results.push((response?.data?.products as Product[]) || []);
    } catch {
      results.push([]);
    }
  }

  sectionProducts.value = results;
  loading.value = false;
};

onMounted(() => {
  if (categorySections.value.length > 0) {
    fetchCategoryProducts();
  }
});

watch(categorySections, (val) => {
  if (val.length > 0) {
    fetchCategoryProducts();
  }
});

const inlineStyle = computed(() => {
  const layout = props.content.layout || {};
  return {
    paddingTop: layout.paddingTop ? `${layout.paddingTop}px` : '2rem',
    paddingBottom: layout.paddingBottom ? `${layout.paddingBottom}px` : '2rem',
    paddingLeft: layout.paddingLeft ? `${layout.paddingLeft}px` : 0,
    paddingRight: layout.paddingRight ? `${layout.paddingRight}px` : 0,
  };
});
</script>

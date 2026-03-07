<template>
  <div data-testid="featured-products-block" class="bg-white">
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8 py-12 md:py-16">
      <div class="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
            {{ t('featuredProducts.title') }}
          </h2>
          <p class="mt-2 text-sm md:text-base text-neutral-600">
            {{ t('featuredProducts.subtitle') }}
          </p>
        </div>
        <NuxtLink
          :to="localePath('/search?term=*')"
          class="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[#384d37] hover:text-[#2c3e2b] transition-colors shrink-0 group"
        >
          {{ t('featuredProducts.viewAll') }}
          <svg class="w-4 h-4 transform transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>
      </div>

      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div v-for="i in 4" :key="i" class="bg-neutral-50 rounded-lg border border-neutral-100 animate-pulse">
          <div class="aspect-square bg-neutral-100 rounded-t-lg" />
          <div class="p-4 space-y-3">
            <div class="h-3 bg-neutral-100 rounded w-3/4" />
            <div class="h-3 bg-neutral-100 rounded w-1/2" />
            <div class="h-5 bg-neutral-100 rounded w-1/3" />
          </div>
        </div>
      </div>

      <div v-else-if="products.length" class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <UiProductCard
          v-for="(product, index) in products.slice(0, maxProducts)"
          :key="productGetters.getVariationId(product)"
          :product="product"
          :configuration="cardConfig"
          :index="index"
        />
      </div>

      <NuxtLink
        :to="localePath('/search?term=*')"
        class="md:hidden flex items-center justify-center gap-1.5 mt-8 text-sm font-semibold text-[#384d37] hover:text-[#2c3e2b] transition-colors"
      >
        {{ t('featuredProducts.viewAll') }}
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import type { Product } from '@plentymarkets/shop-api';
import type { ItemGridFieldKey } from '~/components/blocks/ItemGrid/types';

interface FeaturedProductsProps {
  content?: {
    maxProducts?: number;
    sort?: string;
  };
  meta?: { uuid: string };
}

const props = defineProps<FeaturedProductsProps>();
const localePath = useLocalePath();
const { t } = useI18n();

const maxProducts = computed(() => props.content?.maxProducts ?? 4);
const sortOrder = computed(() => props.content?.sort ?? 'item.createdAt_desc');

const loading = ref(true);
const products = ref<Product[]>([]);

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

onMounted(async () => {
  try {
    const data = await useSdk().plentysystems.getFacet({
      type: 'all',
      itemsPerPage: maxProducts.value,
      sort: sortOrder.value,
    });
    products.value = (data?.data?.products as Product[]) || [];
  } catch {
    products.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="max-w-[1536px] mx-auto px-6 lg:px-8 py-12 md:py-20">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
        <svg class="w-10 h-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
      <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
        {{ t('error.pageNotFoundTitle') }}
      </h1>
      <p class="text-base text-neutral-600 leading-relaxed">
        {{ t('error.pageNotFoundSubtitle') }}
      </p>
    </div>

    <div class="flex justify-center mb-8">
      <UiSearch class="w-full max-w-lg" />
    </div>

    <div class="flex justify-center gap-2 overflow-x-auto scrollbar-hide flex-wrap mb-12">
      <NuxtLink
        v-for="category in categoryTree"
        :key="category.id"
        :to="localePath('/' + categoryTreeGetters.getSlug(category))"
        class="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:border-[#384d37]/30 hover:text-[#384d37] transition-colors duration-200 whitespace-nowrap"
      >
        {{ categoryTreeGetters.getName(category) }}
      </NuxtLink>
    </div>

    <div v-if="products?.length">
      <h2 class="text-lg md:text-xl font-bold text-neutral-900 mb-6">
        {{ t('featuredProducts.title') }}
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <UiProductCard
          v-for="(product, index) in products.slice(0, 8)"
          :key="productGetters.getVariationId(product)"
          :product="product"
          :configuration="cardConfig"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiError, Product } from '@plentymarkets/shop-api';
import { categoryTreeGetters, productGetters } from '@plentymarkets/shop-api';
import type { ItemGridFieldKey } from '~/components/blocks/ItemGrid/types';

const { data: categoryTree } = useCategoryTree();
const localePath = useLocalePath();
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
  showWishlistButton: false,
  showSecondImageOnHover: false,
  addToCartStyle: 'primary' as const,
  paginationPosition: 'bottom' as const,
  layout: { fullWidth: false },
};

onMounted(async () => {
  try {
    const data = await useSdk().plentysystems.getFacet({
      type: 'all',
      itemsPerPage: 8,
    });
    products.value = data.data.products;
  } catch (error) {
    useHandleError(error as ApiError);
  }
});
</script>

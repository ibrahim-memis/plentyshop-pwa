<template>
  <div class="mt-8 flex items-center justify-center p-4">
    <div class="w-full text-center items-center">
      <h1 class="text-3xl md:text-4xl font-semibold mb-4">
        {{ t('error.pageNotFoundTitle') }}
      </h1>

      <p class="text-xl text-gray-600 leading-relaxed">
        {{ t('error.pageNotFoundSubtitle') }}
      </p>

      <div class="flex justify-center my-8">
        <UiSearch class="w-96" />
      </div>

      <div class="flex justify-center gap-2 overflow-x-auto scrollbar-hide flex-wrap">
        <UiButton
          v-for="category in categoryTree"
          :key="category.id"
          :tag="NuxtLink"
          :to="localePath('/' + categoryTreeGetters.getSlug(category))"
          variant="secondary"
        >
          {{ categoryTreeGetters.getName(category) }}
        </UiButton>
      </div>

      <div v-if="filteredProducts.length" class="mt-8 text-left">
        <div class="max-w-[1536px] mx-auto">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg md:text-xl font-bold text-neutral-900">
              {{ t('error.suggestedProducts') }}
            </h2>
            <div class="hidden md:flex items-center gap-2">
              <button
                type="button"
                class="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-[#384d37] hover:border-[#384d37]/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                :disabled="currentSlide === 0"
                @click="prev"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
              </button>
              <button
                type="button"
                class="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-[#384d37] hover:border-[#384d37]/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                :disabled="currentSlide >= maxSlide"
                @click="next"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              </button>
            </div>
          </div>

          <div class="relative overflow-hidden">
            <div
              class="flex transition-transform duration-500 ease-out"
              :style="{ transform: `translateX(-${currentSlide * slideWidth}%)` }"
              @touchstart="onTouchStart"
              @touchmove="onTouchMove"
              @touchend="onTouchEnd"
            >
              <div
                v-for="(product, idx) in filteredProducts"
                :key="productGetters.getVariationId(product)"
                class="shrink-0 px-2"
                :style="{ width: `${slideWidth}%` }"
              >
                <UiProductCard
                  :product="product"
                  :configuration="cardConfig"
                  :index="idx"
                />
              </div>
            </div>

            <div v-if="maxSlide > 0" class="flex md:hidden justify-center mt-6 gap-1.5">
              <button
                v-for="i in maxSlide + 1"
                :key="i"
                type="button"
                class="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
                :class="currentSlide === i - 1 ? 'bg-[#384d37] w-5' : 'bg-neutral-300'"
                @click="currentSlide = i - 1"
              />
            </div>
          </div>

          <div class="mt-4 typography-text-xs flex gap-1">
            <span>{{ t('common.labels.asterisk') }}</span>
            <span v-if="showNetPrices">{{ t('product.priceExclVAT') }}</span>
            <span v-else>{{ t('product.priceInclVAT') }}</span>
            <i18n-t keypath="shipping.excludedLabel" scope="global">
              <template #shipping>
                <SfLink
                  :href="localePath(paths.shipping)"
                  target="_blank"
                  class="focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded"
                >
                  {{ t('common.labels.delivery') }}
                </SfLink>
              </template>
            </i18n-t>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiError, Product } from '@plentymarkets/shop-api';
import { categoryTreeGetters, productGetters } from '@plentymarkets/shop-api';
import { SfLink } from '@storefront-ui/vue';
import type { ItemGridFieldKey } from '~/components/blocks/ItemGrid/types';
import { paths } from '~/utils/paths';

const { data: categoryTree } = useCategoryTree();
const localePath = useLocalePath();
const NuxtLink = resolveComponent('NuxtLink');
const viewport = useViewport();
const { showNetPrices } = useCart();
const products = ref<Product[]>([]);
const currentSlide = ref(0);

const itemsPerView = computed(() => {
  if (viewport.isGreaterOrEquals('lg')) return 4;
  if (viewport.isGreaterOrEquals('md')) return 3;
  return 2;
});

const slideWidth = computed(() => 100 / itemsPerView.value);

const filteredProducts = computed(() =>
  products.value.filter((p) => {
    const img = productGetters.getCoverImage(p);
    return img && !img.includes('placeholder');
  }),
);

const maxSlide = computed(() => Math.max(0, filteredProducts.value.length - itemsPerView.value));

const prev = () => {
  currentSlide.value = Math.max(0, currentSlide.value - 1);
};
const next = () => {
  currentSlide.value = Math.min(maxSlide.value, currentSlide.value + 1);
};

let touchStartX = 0;
let touchDeltaX = 0;
const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0]?.clientX ?? 0;
  touchDeltaX = 0;
};
const onTouchMove = (e: TouchEvent) => {
  touchDeltaX = (e.touches[0]?.clientX ?? 0) - touchStartX;
};
const onTouchEnd = () => {
  if (touchDeltaX > 50) prev();
  else if (touchDeltaX < -50) next();
};

watch(itemsPerView, () => {
  if (currentSlide.value > maxSlide.value) {
    currentSlide.value = maxSlide.value;
  }
});

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
      itemsPerPage: 20,
    });

    products.value = data.data.products;
  } catch (error) {
    useHandleError(error as ApiError);
  }
});
</script>

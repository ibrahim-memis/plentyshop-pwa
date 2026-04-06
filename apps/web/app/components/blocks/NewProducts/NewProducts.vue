<template>
  <div data-testid="new-products-block" class="bg-white">
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8 py-12 md:py-16">
      <div class="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
            {{ t('newProducts.title') }}
          </h2>
          <p class="mt-2 text-sm md:text-base text-neutral-500">
            {{ t('newProducts.subtitle') }}
          </p>
        </div>
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

      <div v-else-if="products.length" class="relative overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${currentSlide * slideWidth}%)` }"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div
            v-for="(product, idx) in products"
            :key="productGetters.getVariationId(product)"
            class="shrink-0 px-2"
            :style="{ width: `${slideWidth}%` }"
          >
            <div class="relative">
              <span class="new-badge absolute top-2.5 left-2.5 z-10 px-2.5 py-1 text-white text-[11px] rounded-full shadow-md" style="font-family: 'Georgia', 'Times New Roman', serif; font-style: italic; letter-spacing: 0.5px; background: linear-gradient(135deg, #384d37 0%, #4a6741 100%);">
                {{ t('newProducts.badge') }}
              </span>
              <UiProductCard
                :product="product"
                :configuration="cardConfig"
                :index="idx"
              />
            </div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import type { Product } from '@plentymarkets/shop-api';
import type { ItemGridFieldKey } from '~/components/blocks/ItemGrid/types';

interface NewProductsProps {
  content: {
    maxItems?: number;
  };
  meta?: { uuid: string };
  index?: number;
}

const props = defineProps<NewProductsProps>();
const { t } = useI18n();
const viewport = useViewport();

const maxItems = computed(() => props.content?.maxItems ?? 8);
const loading = ref(true);
const products = ref<Product[]>([]);
const currentSlide = ref(0);

const itemsPerView = computed(() => {
  if (viewport.isGreaterOrEquals('lg')) return 4;
  if (viewport.isGreaterOrEquals('md')) return 3;
  return 2;
});

const slideWidth = computed(() => 100 / itemsPerView.value);
const maxSlide = computed(() => Math.max(0, products.value.length - itemsPerView.value));

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

const isNewProduct = (product: Product): boolean => {
  const storeSpecial = (product as any)?.item?.storeSpecial;
  return storeSpecial?.id === 2;
};

const fetchNewProducts = async () => {
  loading.value = true;
  try {
    const { data: categoryTree } = useCategoryTree();
    if (!categoryTree.value?.length) {
      loading.value = false;
      return;
    }

    const sdk = useSdk();
    const topCategories = categoryTree.value
      .filter((cat) => cat.type === 'item')
      .slice(0, 5);

    const allProducts: Product[] = [];

    for (const cat of topCategories) {
      try {
        const response = await sdk.plentysystems.getFacet({
          categoryId: String(cat.id),
          itemsPerPage: 20,
          sort: 'item.createdAt_desc',
          type: 'category',
          page: 1,
        });
        const catProducts = (response?.data?.products as Product[]) || [];
        allProducts.push(...catProducts);
      } catch {
        // skip failed category
      }
    }

    const newItems = allProducts.filter(isNewProduct);

    const seen = new Set<string>();
    const unique = newItems.filter((p) => {
      const id = productGetters.getItemId(p);
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });

    products.value = unique.slice(0, maxItems.value);
  } catch {
    products.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(fetchNewProducts);
</script>

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
        <div
          v-for="(product, idx) in products"
          :key="productGetters.getVariationId(product)"
          class="relative"
        >
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

const maxItems = computed(() => props.content?.maxItems ?? 8);
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

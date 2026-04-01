<template>
  <div v-bind="$attrs" style="padding-left: 10px;">
    <TextContent data-testid="recommended-block" class="pb-4" :text="props.content.text" :index="props.index" />
    <template v-if="displayItems.length && (shouldRender || shouldRenderAfterUpdate)">
      <div v-if="isGridMode" class="grid gap-4" :class="gridClass">
        <UiProductCard
          v-for="(product, idx) in displayItems"
          :key="productGetters.getVariationId(product)"
          :product="product"
          :index="idx"
        />
      </div>
      <ProductSlider v-else :items="displayItems" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ProductRecommendedProductsProps } from './types';
import { productGetters } from '@plentymarkets/shop-api';

const props = withDefaults(defineProps<ProductRecommendedProductsProps>(), { shouldLoad: undefined });

const { locale } = useI18n();
const { data: categoryTree } = useCategoryTree();
const { currentProduct } = useProducts();

const itemId = computed(() =>
  Object.keys(currentProduct.value).length
    ? productGetters.getItemId(currentProduct.value)
    : props.content.source.itemId,
);

const firstCategoryId = computed(() => categoryTree.value?.find((category) => category.type === 'item')?.id || '');
const categoryId = computed(() => {
  if (!currentProduct.value?.item) return '';
  return productGetters.getCategoryIds(currentProduct.value)[0] ?? '';
});

const shouldRenderAfterUpdate = ref(false);

const { data: recommendedProducts, fetchProductRecommended } = useProductRecommended(props.meta.uuid);

const maxItems = computed(() => props.content.layout?.maxItems ?? 20);
const isGridMode = computed(() => props.content.layout?.displayMode === 'grid');
const gridColumns = computed(() => props.content.layout?.gridColumns ?? 4);

const displayItems = computed(() => {
  if (!recommendedProducts.value?.length) return [];
  return recommendedProducts.value.slice(0, maxItems.value);
});

const gridClass = computed(() => {
  const cols = gridColumns.value;
  if (cols <= 2) return 'grid-cols-2';
  if (cols === 3) return 'grid-cols-2 md:grid-cols-3';
  if (cols === 4) return 'grid-cols-2 md:grid-cols-4';
  return 'grid-cols-2 md:grid-cols-5';
});

const isCategory = computed(() => props.content.source?.type === 'category');
const isProduct = computed(() => props.content.source?.type === 'cross_selling' && !!itemId.value);
const shouldRender = computed(() => props.shouldLoad === undefined || props.shouldLoad === true);
const canFetch = computed(() => isCategory.value || isProduct.value);

const getContentSource = () => {
  return {
    ...props.content.source,
    ...{
      categoryId: props.content.source?.categoryId || (categoryId.value || firstCategoryId.value || '').toString(),
      itemId: itemId.value,
    },
  };
};

let fetchInFlight = false;
let lastFetchKey = '';

const doFetch = async () => {
  if (!canFetch.value || fetchInFlight) return;
  const source = getContentSource();
  const fetchKey = `${source.type}-${source.itemId}-${source.categoryId}-${source.crossSellingRelation}`;
  if (fetchKey === lastFetchKey) return;
  if (source.categoryId || (source.itemId && source.type === 'cross_selling')) {
    fetchInFlight = true;
    lastFetchKey = fetchKey;
    try {
      const result = await fetchProductRecommended(source);

      if ((!result || result.length === 0) && source.type === 'cross_selling' && categoryId.value) {
        const fallbackKey = `category-${source.itemId}-${categoryId.value}-${source.crossSellingRelation}`;
        lastFetchKey = fallbackKey;
        await fetchProductRecommended({
          ...source,
          type: 'category',
          categoryId: categoryId.value,
        });
      }
    } catch (error) {
      console.warn('[ProductRecommendedProducts] fetch failed:', error);
    } finally {
      fetchInFlight = false;
    }
  }
};

watch(
  [canFetch, itemId, categoryId, () => locale.value,
   () => props.content.source?.crossSellingRelation],
  () => {
    doFetch();
    shouldRenderAfterUpdate.value = true;
  },
  { immediate: true },
);
</script>

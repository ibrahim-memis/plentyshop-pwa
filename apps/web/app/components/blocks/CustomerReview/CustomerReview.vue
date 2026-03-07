<template>
  <div
    ref="reviewArea"
    class="relative col-span-5 h-fit"
    :class="{ 'pointer-events-none opacity-50': loadingReviews }"
    :style="customerReviewInlineStyle"
    data-testid="review-area"
  >
    <!-- Loading Spinner -->
    <div v-if="loadingReviews" class="absolute inset-0 flex items-center justify-center z-10 bg-white/60 backdrop-blur-sm rounded-lg">
      <SfLoaderCircular data-testid="loader" size="2xl" />
    </div>

    <!-- Accordion modunda -->
    <div
      v-if="hasTitle && props.content.layout.collapsible"
      id="customerReviewsAccordion"
      data-testid="reviews-accordion"
      class="border-t border-neutral-200"
    >
      <UiAccordionItem
        v-model="reviewsOpen"
        summary-class="w-full py-5 px-0 flex justify-between items-center select-none group cursor-pointer"
      >
        <template #summary>
          <h2 id="customerReviewsClick" class="font-semibold text-base md:text-lg text-neutral-900">
            {{ props.content.text.title }}
          </h2>
        </template>

        <div class="pt-2">
          <UiReviewStatistics :product="product" />

          <!-- Yorum Listesi -->
          <div class="divide-y divide-neutral-200">
            <UiReview v-for="(reviewItem, key) in authenticatedProductReviews" :key="'auth-' + key" :review-item="reviewItem" />
            <UiReview v-for="(reviewItem, key) in paginatedProductReviews" :key="'page-' + key" :review-item="reviewItem" />
          </div>

          <!-- Yorum Yok -->
          <div
            v-if="paginatedProductReviews.length === 0 && authenticatedProductReviews.length === 0"
            data-testid="no-review-text"
            class="text-center py-10"
          >
            <div class="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center mx-auto mb-4">
              <SfIconStar class="text-neutral-300" size="lg" />
            </div>
            <p class="text-sm text-neutral-500 font-medium">{{ t('product.noReviews') }}</p>
          </div>

          <div v-if="paginatedProductReviews.length > 0" class="pt-6">
            <UiPagination
              :key="pagination.totalCount"
              :current-page="currentPage"
              :total-items="pagination.totalCount"
              :page-size="config.defaultItemsPerPage"
              :max-visible-pages="maxVisiblePages"
              current-page-name="feedbackPage"
            />
          </div>
        </div>
      </UiAccordionItem>
    </div>

    <!-- Normal mod (accordion degil) -->
    <div v-else>
      <h2 id="customerReviewsClick" class="font-bold text-lg md:text-xl text-neutral-900 mb-4">
        {{ props.content.text.title }}
      </h2>

      <UiReviewStatistics :product="product" />

      <!-- Yorum Listesi -->
      <div class="divide-y divide-neutral-200">
        <UiReview v-for="(reviewItem, key) in paginatedProductReviews" :key="key" :review-item="reviewItem" />
      </div>

      <!-- Yorum Yok -->
      <div
        v-if="paginatedProductReviews.length === 0"
        data-testid="no-review-text"
        class="text-center py-10"
      >
        <div class="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center mx-auto mb-4">
          <SfIconStar class="text-neutral-300" size="lg" />
        </div>
        <p class="text-sm text-neutral-500 font-medium">{{ t('product.noReviews') }}</p>
      </div>

      <div v-if="paginatedProductReviews.length > 0" class="pt-6">
        <UiPagination
          :key="pagination.totalCount"
          :current-page="currentPage"
          :total-items="pagination.totalCount"
          :page-size="config.defaultItemsPerPage"
          :max-visible-pages="maxVisiblePages"
          current-page-name="feedbackPage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { productGetters, reviewGetters } from '@plentymarkets/shop-api';
import { SfLoaderCircular, SfIconStar } from '@storefront-ui/vue';
import type { ProductAccordionPropsType } from '~/components/ReviewsAccordion/types';
import type { CustomerReviewProps } from './types';

const props = defineProps<CustomerReviewProps & ProductAccordionPropsType>();
const viewport = useViewport();
const reviewsOpen = ref(!props.content.layout.initiallyCollapsed);
const route = useRoute();

const config = useRuntimeConfig().public;
const { currentProduct } = useProducts();

const product = computed(() => props.product || currentProduct.value);
const productId = computed(() => {
  if (!product.value?.item) return 0;
  const id = productGetters.getItemId(product.value);
  return id ? Number(id) : 0;
});
const productVariationId = computed(() => {
  if (!product.value?.variation) return undefined;
  return productGetters.getVariationId(product.value);
});

const {
  data: productReviews,
  authenticatedData: productAuthenticatedReviews,
  loading: loadingReviews,
  fetchReviews,
  fetchAuthenticatedReviews,
  reviewArea,
} = useProductReviews(productId.value, productVariationId.value);

watch([productId, productVariationId], async ([newId, newVariationId], [oldId, oldVariationId]) => {
  if ((newId !== oldId || newVariationId !== oldVariationId) && newId > 0) {
    await Promise.all([fetchReviews(), fetchAuthenticatedReviews()]);
  }
});

const paginatedProductReviews = computed(() => reviewGetters.getReviewItems(productReviews.value));
const authenticatedProductReviews = computed(() => reviewGetters.getReviewItems(productAuthenticatedReviews.value));
const pagination = computed(() => reviewGetters.getReviewPagination(productReviews.value));
const currentPage = computed(() => reviewGetters.getCurrentReviewsPage(productReviews.value));

const maxVisiblePages = computed(() => (viewport.isGreaterOrEquals('lg') ? 5 : 2));

const hasTitle = computed(() => {
  return props.content.text.title && props.content.text.title.trim().length > 0;
});

watch(
  () => reviewsOpen.value,
  async (value) => {
    if (value && hasTitle.value && props.content.layout.collapsible) {
      await Promise.all([fetchReviews(), fetchAuthenticatedReviews()]);
    }
  },
);
watch(
  () => route.query.feedbackPage,
  async () => {
    if (reviewArea.value) reviewArea.value.scrollIntoView({ behavior: 'smooth' });
  },
);

watch(
  () => route.query,
  () => fetchReviews(),
);

watch(
  () => props.content.layout.initiallyCollapsed,
  (newValue) => {
    reviewsOpen.value = !newValue;
  },
);

const customerReviewInlineStyle = computed(() => {
  const layout = props.content.layout ?? {};
  return {
    paddingTop: layout.paddingTop ? `${layout.paddingTop}px` : 0,
    paddingBottom: layout.paddingBottom ? `${layout.paddingBottom}px` : 0,
    paddingLeft: layout.paddingLeft ? `${layout.paddingLeft}px` : 0,
    paddingRight: layout.paddingRight ? `${layout.paddingRight}px` : 0,
  };
});
</script>

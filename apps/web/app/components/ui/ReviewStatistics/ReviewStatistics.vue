<template>
  <div class="mb-6" data-testid="average-section">
    <div class="flex flex-col md:flex-row gap-8 items-start">
      <!-- Sol: Ortalama Puan -->
      <div class="flex flex-col items-center md:items-start min-w-[160px]">
        <div class="flex items-baseline gap-2 mb-1">
          <span class="text-5xl font-bold text-neutral-900 tracking-tight" data-testid="average-info">
            {{ reviewAverageText }}
          </span>
          <span class="text-lg text-neutral-400 font-medium">/5</span>
        </div>
        <SfRating
          class="mb-2"
          size="lg"
          :max="5"
          :value="reviewAverageStars || reviewAverageText"
          :half-increment="true"
        />
        <p class="text-sm text-neutral-500 mb-4" data-testid="review-count">
          {{ t('product.basedOnRatings', { count: totalReviews }) }}
        </p>
        <UiButton
          data-testid="add-review-button"
          size="base"
          class="!rounded-lg !bg-primary-800 hover:!bg-primary-700 !text-white !font-semibold !text-sm !px-6 transition-colors duration-200"
          @click="openReviewModal(defaults.DEFAULT_REVIEW_MODAL_TYPES.createReview)"
        >
          {{ t('product.createReview') }}
        </UiButton>
      </div>

      <!-- Sag: Rating Breakdown -->
      <div class="flex-1 w-full space-y-2">
        <div
          v-for="(proportionalRating, key) in ratingPercentages"
          :key="key"
          class="flex items-center gap-3 group"
        >
          <div class="flex items-center gap-1 w-10 justify-end shrink-0">
            <span class="text-sm font-medium text-neutral-600">{{ 5 - key }}</span>
            <SfIconStarFilled class="text-warning-500" size="xs" />
          </div>
          <div class="flex-1 h-2.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-warning-500 rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${proportionalRating}%` }"
            />
          </div>
          <span class="text-sm text-neutral-400 w-8 text-right shrink-0">{{ splitRatings[key] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfRating, SfIconStarFilled } from '@storefront-ui/vue';
import type { ReviewStatisticsProps } from './types';
import { productGetters, reviewGetters } from '@plentymarkets/shop-api';
import { defaults } from '~/composables';

const props = defineProps<ReviewStatisticsProps>();
const { currentProduct } = useProducts();

const product = computed(() => props.product || currentProduct.value);
const productId = computed(() => {
  const id = productGetters.getItemId(product.value);
  return id ? Number(id) : 0;
});

const { data: productReviews, openReviewModal, fetchProductReviews } = useProductReviews(productId.value);

watch(productId, async (newId, oldId) => {
  if (newId !== oldId && newId > 0) {
    await fetchProductReviews(newId);
  }
});

const countsProductReviews = computed(() => reviewGetters.getReviewCounts(productReviews.value));

const reviewAverageText = computed(() => reviewGetters.getAverageRating(countsProductReviews.value, 'tenth'));
const reviewAverageStars = computed(() => reviewGetters.getAverageRating(countsProductReviews.value, 'half'));
const totalReviews = computed(() => reviewGetters.getTotalReviews(countsProductReviews.value));
const ratingPercentages = computed(() =>
  reviewGetters.getReviewCountsOrPercentagesByRatingDesc(countsProductReviews.value, true),
);
const splitRatings = computed(() => reviewGetters.getReviewCountsOrPercentagesByRatingDesc(countsProductReviews.value));
</script>

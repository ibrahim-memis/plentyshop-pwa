<template>
  <article class="w-full py-6 border-b border-neutral-200 last:border-b-0" data-testid="review-item">
    <!-- Ust kisim: Avatar + Yazar + Tarih + Rating -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-3">
        <!-- Avatar (baş harfler) -->
        <div class="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
          <span class="text-sm font-semibold text-primary-700">{{ authorInitials }}</span>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-sm font-semibold text-neutral-900" data-testid="review-item-authorName">
              {{ reviewAuthor }}
            </span>
            <span
              v-if="verifiedPurchase"
              class="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full"
            >
              <SfIconCheck size="xs" />
              {{ t('review.verifiedPurchase') }}
            </span>
          </div>
          <span class="text-xs text-neutral-400">
            {{ $d(new Date(reviewGetters.getReviewDate(reviewItem))) }}
          </span>
        </div>
      </div>

      <!-- Duzenle / Sil -->
      <div v-if="isEditable" class="flex items-center gap-2">
        <SfTooltip :label="tooltipReviewLabel" class="flex">
          <SfIconVisibility v-if="isReviewVisibile" size="sm" class="fill-neutral-400" />
          <SfIconVisibilityOff v-else size="sm" class="fill-neutral-400" />
        </SfTooltip>
        <button
          class="p-1.5 rounded-md hover:bg-neutral-100 transition-colors"
          data-testid="edit-review-button"
          @click="openReviewModal(defaults.DEFAULT_REVIEW_MODAL_TYPES.updateReview, reviewItem)"
        >
          <SfIconBase viewBox="0 0 32 32" size="xs" class="fill-neutral-500">
            <path :d="penPath" />
          </SfIconBase>
        </button>
        <button
          class="p-1.5 rounded-md hover:bg-red-50 transition-colors"
          data-testid="remove-review-button"
          @click="openReviewModal(defaults.DEFAULT_REVIEW_MODAL_TYPES.deleteReview, reviewItem)"
        >
          <SfIconDelete size="sm" class="fill-neutral-500 hover:fill-red-500" />
        </button>
      </div>
    </div>

    <!-- Yildizlar -->
    <div class="mb-2">
      <SfRating :value="reviewGetters.getReviewRating(reviewItem) ?? undefined" :max="5" size="xs" />
    </div>

    <!-- Baslik + Mesaj -->
    <h4
      v-if="reviewGetters.getReviewTitle(reviewItem)"
      class="font-semibold text-sm text-neutral-900 mb-1"
      data-testid="review-item-title"
    >
      {{ reviewGetters.getReviewTitle(reviewItem) }}
    </h4>
    <p class="text-sm text-neutral-600 leading-relaxed">{{ reviewGetters.getReviewMessage(reviewItem) }}</p>

    <!-- Yanitlar -->
    <div v-if="reviewItem.replies.length > 0" class="mt-4">
      <button
        type="button"
        class="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800 cursor-pointer transition-colors"
        data-testid="show-replies"
        @click="isCollapsed = !isCollapsed"
      >
        <span>{{ t(isCollapsed ? 'review.showAnswers' : 'review.hideAnswers') }}</span>
        <span class="text-xs text-neutral-400">({{ reviewItem.replies.length }})</span>
      </button>
    </div>

    <div v-if="!isCollapsed" class="mt-4 ml-6 pl-4 border-l-2 border-neutral-100 space-y-4">
      <div
        v-for="(reply, index) in replies"
        :key="index"
        data-testid="reply-item"
      >
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-neutral-800" data-testid="reply-item-authorName">
              {{ reply.authorName || t('review.anonymous') }}
            </span>
            <span class="text-xs text-neutral-400">{{ $d(new Date(reviewGetters.getReplyDate(reply))) }}</span>
          </div>

          <div v-if="isAnswerEditable(reply)" class="flex items-center gap-1">
            <SfTooltip :label="tooltipReplyLabel(reply)" class="flex">
              <SfIconVisibility v-if="reviewGetters.getReviewVisibility(reply)" size="xs" class="fill-neutral-400" />
              <SfIconVisibilityOff v-else size="xs" class="fill-neutral-400" />
            </SfTooltip>
            <button
              class="p-1 rounded hover:bg-neutral-100 transition-colors"
              data-testid="edit-reply-button"
              @click="openReviewModal(defaults.DEFAULT_REVIEW_MODAL_TYPES.updateReply, reply)"
            >
              <SfIconBase viewBox="0 0 38 38" size="xs" class="fill-neutral-500">
                <path :d="penPath" />
              </SfIconBase>
            </button>
            <button
              class="p-1 rounded hover:bg-red-50 transition-colors"
              data-testid="remove-reply-button"
              @click="openReviewModal(defaults.DEFAULT_REVIEW_MODAL_TYPES.deleteReply, reply)"
            >
              <SfIconDelete size="xs" class="fill-neutral-500 hover:fill-red-500" />
            </button>
          </div>
        </div>
        <p class="text-sm text-neutral-600 leading-relaxed">{{ reviewGetters.getReviewMessage(reply) }}</p>
      </div>
    </div>

    <!-- Yanit Yaz -->
    <div v-if="!isAnswerFormOpen && isAuthorized" class="mt-3">
      <button
        class="text-sm font-medium text-primary-700 hover:text-primary-800 cursor-pointer transition-colors"
        data-testid="add-reply-button"
        @click="isAnswerFormOpen = true"
      >
        {{ t('review.answer') }}
      </button>
    </div>
    <div v-if="isAnswerFormOpen" class="mt-3 ml-6 pl-4 border-l-2 border-neutral-100">
      <ReplyForm :review-item="reviewItem" @on-close="isAnswerFormOpen = false" />
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  SfRating,
  SfIconCheck,
  SfIconDelete,
  SfIconVisibility,
  SfIconVisibilityOff,
  SfTooltip,
  SfIconBase,
} from '@storefront-ui/vue';
import type { ReviewProps } from './types';
import { type ReviewItem, reviewGetters, productGetters } from '@plentymarkets/shop-api';
import { defaults } from '~/composables';
import { penPath } from '~/assets/icons/paths/pen';

const props = defineProps<ReviewProps>();
const { reviewItem } = toRefs(props);
const isAnswerFormOpen = ref(false);
const isCollapsed = ref(true);

const { user, isAuthorized } = useCustomer();
const { currentProduct } = useProducts();
const { openReviewModal } = useProductReviews(Number(productGetters.getItemId(currentProduct.value)));

const reviewAuthor = computed(() => reviewGetters.getReviewAuthor(reviewItem.value) || t('review.anonymous'));
const authorInitials = computed(() => {
  const name = reviewAuthor.value;
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
  return name.substring(0, 2).toUpperCase();
});
const replies = computed(() => reviewGetters.getReviewReplies(reviewItem.value));
const verifiedPurchase = reviewGetters.getVerifiedPurchase(reviewItem.value);
const isReviewVisibile = reviewGetters.getReviewVisibility(reviewItem.value);
const tooltipReviewLabel = isReviewVisibile ? t('review.tooltipVisibilityOn') : t('review.tooltipVisibilityOff');

const tooltipReplyLabel = (reply: ReviewItem) =>
  reviewGetters.getReviewVisibility(reply) ? t('review.tooltipVisibilityOn') : t('review.tooltipVisibilityOff');

const isAnswerEditable = (replyItem: ReviewItem) =>
  replyItem.sourceRelation?.[0]?.feedbackRelationSourceId === user.value?.id?.toString();

const isEditable = computed(
  () => reviewItem.value.sourceRelation?.[0]?.feedbackRelationSourceId?.toString() === user.value?.id?.toString(),
);
</script>

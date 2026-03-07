<template>
  <section v-if="description1" class="mt-1 mb-8">
    <div class="border-t border-neutral-200 pt-2">
      <div class="max-w-none">
        <div
          class="text-[14px] text-neutral-600 leading-6 [&>*]:text-[14px] mt-[15px]"
          :class="{ 'line-clamp-4': !isExpanded && isLongContent }"
          v-html="description1"
        />
      </div>

      <button
        v-if="isLongContent"
        type="button"
        class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors cursor-pointer"
        @click="isExpanded = !isExpanded"
      >
        {{ isExpanded ? t('categoryDescription.showLess') : t('categoryDescription.showMore') }}
        <svg
          class="w-4 h-4 transition-transform duration-200"
          :class="{ 'rotate-180': isExpanded }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { categoryGetters, type Category } from '@plentymarkets/shop-api';

const { data: productsCatalog } = useProducts();
const category = computed(() => productsCatalog.value?.category || ({} as Category));

const description1 = computed(() => categoryGetters.getCategoryDescription1(category.value) || '');

const isLongContent = computed(() => (description1.value?.length || 0) > 300);
const isExpanded = ref(false);
</script>

<i18n lang="json">
{
  "de": {
    "categoryDescription": {
      "showMore": "Mehr anzeigen",
      "showLess": "Weniger anzeigen"
    }
  },
  "en": {
    "categoryDescription": {
      "showMore": "Show more",
      "showLess": "Show less"
    }
  }
}
</i18n>

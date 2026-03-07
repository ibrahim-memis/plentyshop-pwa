<template>
  <nav
    class="flex items-center justify-center gap-1 py-6"
    role="navigation"
    :aria-label="t('common.labels.pagination')"
    data-testid="pagination"
  >
    <!-- Önceki -->
    <button
      type="button"
      :aria-label="t('common.navigation.previousAriaLabel')"
      :disabled="pagination.selectedPage <= 1 || disabled"
      class="flex items-center justify-center w-10 h-10 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      data-testid="pagination-previous"
      @click="previousPage"
    >
      <SfIconChevronLeft class="!w-5 !h-5" />
    </button>

    <!-- İlk sayfa (görünmüyorsa) -->
    <button
      v-if="!pagination.pages.includes(1)"
      type="button"
      :aria-current="pagination.selectedPage === 1"
      :aria-label="getAriaLabel(pagination.selectedPage === 1, 1)"
      class="flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-colors cursor-pointer"
      :class="pagination.selectedPage === 1
        ? 'bg-neutral-900 text-white'
        : 'text-neutral-600 hover:bg-neutral-100'"
      @click="setPage(1)"
    >
      1
    </button>

    <!-- Başlangıç ellipsis -->
    <span v-if="pagination.startPage > 2" class="flex items-center justify-center w-10 h-10 text-neutral-400 text-sm">
      ...
    </span>

    <!-- Önceki link (maxPages=1) -->
    <button
      v-if="shouldDisplayPreviousLink"
      type="button"
      class="flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
      :aria-label="getAriaLabel(false, pagination.endPage - 1)"
      :disabled="disabled"
      @click="setPage(pagination.endPage - 1)"
    >
      {{ pagination.endPage - 1 }}
    </button>

    <!-- Sayfa numaraları -->
    <button
      v-for="page in pagination.pages"
      :key="`page-${page}`"
      type="button"
      :aria-current="pagination.selectedPage === page"
      :aria-label="getAriaLabel(pagination.selectedPage === page, page)"
      :disabled="disabled"
      class="flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-colors cursor-pointer"
      :class="pagination.selectedPage === page
        ? 'bg-neutral-900 text-white'
        : 'text-neutral-600 hover:bg-neutral-100'"
      @click="setPage(page)"
    >
      {{ page }}
    </button>

    <!-- Sonraki link (maxPages=1) -->
    <button
      v-if="shouldDisplayNextLink"
      type="button"
      class="flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
      :aria-label="t('goToPage', { page: 2 })"
      :disabled="disabled"
      @click="setPage(2)"
    >
      2
    </button>

    <!-- Bitiş ellipsis -->
    <span v-if="pagination.endPage < pagination.totalPages - 1" class="flex items-center justify-center w-10 h-10 text-neutral-400 text-sm">
      ...
    </span>

    <!-- Son sayfa (görünmüyorsa) -->
    <button
      v-if="!pagination.pages.includes(pagination.totalPages)"
      type="button"
      :aria-current="pagination.totalPages === pagination.selectedPage"
      :aria-label="getAriaLabel(pagination.totalPages === pagination.selectedPage, pagination.totalPages)"
      :disabled="disabled"
      class="flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-colors cursor-pointer"
      :class="pagination.selectedPage === pagination.totalPages
        ? 'bg-neutral-900 text-white'
        : 'text-neutral-600 hover:bg-neutral-100'"
      @click="setPage(pagination.totalPages)"
    >
      {{ pagination.totalPages }}
    </button>

    <!-- Sonraki -->
    <button
      type="button"
      :aria-label="t('common.navigation.nextAriaLabel')"
      :disabled="pagination.selectedPage >= pagination.totalPages || disabled"
      class="flex items-center justify-center w-10 h-10 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      data-testid="pagination-next"
      @click="nextPage"
    >
      <SfIconChevronRight class="!w-5 !h-5" />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { SfIconChevronLeft, SfIconChevronRight, usePagination } from '@storefront-ui/vue';
import type { PaginationProps } from '~/components/ui/Pagination/types';

const { updatePage } = useCategoryFilter();

const {
  currentPage,
  currentPageName = 'page',
  pageSize,
  totalItems,
  maxVisiblePages: maxVisiblePagesProperty,
  disabled = false,
} = defineProps<PaginationProps>();

const pagination = computed(() =>
  reactive(
    usePagination({
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      maxPages: maxVisiblePagesProperty,
    }),
  ),
);

const getAriaLabel = (isCurrent: boolean, page: number) => {
  return t(isCurrent ? 'common.navigation.currentPage' : 'common.navigation.goToPage', { page });
};

const setPage = (page: number) => {
  updatePage(page.toString(), currentPageName);
  pagination.value.setPage(page);
};

const previousPage = () => {
  setPage(pagination.value.selectedPage - 1);
};

const nextPage = () => {
  setPage(pagination.value.selectedPage + 1);
};

const shouldDisplayPreviousLink: boolean =
  maxVisiblePagesProperty === 1 &&
  pagination.value.totalPages > 1 &&
  pagination.value.selectedPage === pagination.value.totalPages;

const shouldDisplayNextLink: boolean =
  maxVisiblePagesProperty === 1 && pagination.value.totalPages > 1 && pagination.value.selectedPage === 1;
</script>

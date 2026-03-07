<template>
  <NarrowContainer class="mb-20" data-testid="category-layout">
    <div class="pt-8 pb-6 md:pt-10 md:pb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">{{ title }}</h1>
      <p v-if="totalProducts > 0" class="mt-2 text-sm text-neutral-500">
        {{ t('search.numberOfProducts', { count: products?.length ?? 0, total: totalProducts }) }}
      </p>
    </div>

    <div data-testid="category-page-content">
      <template v-if="hasSidebar">
        <div class="flex items-center justify-between mb-4 pb-4 border-b border-neutral-100">
          <span class="text-sm font-medium text-neutral-600">
            {{ t('search.numberOfProducts', { count: products?.length ?? 0, total: totalProducts }) }}
          </span>
          <button
            type="button"
            class="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors cursor-pointer"
            @click="open"
          >
            <SfIconTune class="!w-4 !h-4" />
            {{ t('common.labels.filters') }}
          </button>
        </div>

        <CategorySidebar :is-open="isOpen" @close="close">
          <NuxtLazyHydrate when-visible>
            <slot name="sidebar" />
          </NuxtLazyHydrate>
        </CategorySidebar>
      </template>

      <section
        v-if="products?.length"
        class="grid grid-cols-2 gap-4 md:gap-5 md:grid-cols-3 lg:grid-cols-4 mb-10"
        data-testid="category-grid"
      >
        <NuxtLazyHydrate
          v-for="(product, index) in products"
          :key="productGetters.getVariationId(product)"
          when-visible
        >
          <UiProductCard
            :product="product"
            :name="productGetters.getName(product) ?? ''"
            :rating-count="productGetters.getTotalReviews(product)"
            :rating="productGetters.getAverageRating(product, 'half')"
            :image-url="addModernImageExtension(productGetters.getCoverImage(product))"
            :image-alt="
              productImageGetters.getImageAlternate(productImageGetters.getFirstImage(product)) ||
              productGetters.getName(product) ||
              ''
            "
            :image-title="productImageGetters.getImageName(productImageGetters.getFirstImage(product)) || ''"
            :image-height="productGetters.getImageHeight(product) || 600"
            :image-width="productGetters.getImageWidth(product) || 600"
            :slug="productGetters.getSlug(product) + `-${productGetters.getId(product)}`"
            :priority="index < 5"
            :base-price="productGetters.getDefaultBasePrice(product)"
            :unit-content="productGetters.getUnitContent(product)"
            :unit-name="productGetters.getUnitName(product)"
            :show-base-price="productGetters.showPricePerUnit(product)"
          />
        </NuxtLazyHydrate>
      </section>

      <LazyCategoryEmptyState v-else />

      <!-- Legal footnote hidden -->

      <UiPagination
        v-if="totalProducts > 0"
        :key="`${totalProducts}-${itemsPerPage}`"
        :current-page="getFacetsFromURL().page ?? 1"
        :total-items="totalProducts"
        :page-size="itemsPerPage"
        :max-visible-pages="maxVisiblePages"
      />
    </div>
  </NarrowContainer>
</template>

<script setup lang="ts">
import { productGetters, productImageGetters } from '@plentymarkets/shop-api';
import { SfIconTune, useDisclosure, SfLink } from '@storefront-ui/vue';
import type { CategoryPageContentProps } from '~/components/CategoryPageContent/types';
import { paths } from '~/utils/paths';

const { title, totalProducts, itemsPerPage = 24, products = [] } = defineProps<CategoryPageContentProps>();

const { t } = useI18n({ useScope: 'global' });
const localePath = useLocalePath();
const { getFacetsFromURL } = useCategoryFilter();
const { addModernImageExtension } = useModernImage();

const { showNetPrices } = useCart();

const slots: Record<string, ((...args: any[]) => any) | undefined> = useSlots();
const hasSidebar = computed((): boolean => !!slots.sidebar);
const { isOpen, open, close } = useDisclosure();
const viewport = useViewport();

const maxVisiblePages = computed(() => (viewport.isGreaterOrEquals('lg') ? 5 : 2));
</script>

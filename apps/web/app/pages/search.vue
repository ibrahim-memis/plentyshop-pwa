<template>
  <NuxtLayout name="default">
    <div data-testid="search-results" class="relative" :class="{ 'pointer-events-none opacity-50': loading }">
      <SfLoaderCircular v-if="loading" class="fixed top-[50%] right-0 left-0 m-auto z-[99999]" size="2xl" />

      <template v-if="productsCatalog">
        <NarrowContainer class="mb-20 px-4 md:px-0" data-testid="category-layout">
          <h1 class="my-10 font-bold typography-headline-3 md:typography-headline-2">
            {{ t('search.searchResults', { phrase: route.query.term }) }}
          </h1>

          <!-- Horizontal filter bar -->
          <div v-if="hasFacets" class="bg-neutral-50 border-y border-neutral-100 mb-[10px]">
            <div class="flex items-center justify-between px-2 py-2 gap-3">
              <div class="flex items-center gap-1 flex-wrap">
                <span class="text-xs font-semibold text-neutral-500 mr-1 whitespace-nowrap">{{ t('filterBar.filterBy') }}:</span>
                <template v-for="facet in dynamicFacets" :key="getFacetId(facet)">
                  <div ref="facetButtonRefs" class="relative">
                    <button
                      type="button"
                      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                      :class="openFacetId === getFacetId(facet) ? 'bg-[#384d37] text-white' : 'text-neutral-700 hover:bg-neutral-100'"
                      @click="toggleFacetDropdown(facet, $event)"
                    >
                      {{ facetGetters.getName(facet) }}
                      <svg class="w-3 h-3 transition-transform" :class="openFacetId === getFacetId(facet) ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </button>
                  </div>
                </template>
              </div>

              <div class="flex items-center gap-3 shrink-0">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-semibold text-neutral-500 whitespace-nowrap">{{ t('filterBar.sortBy') }}:</span>
                  <select
                    :value="currentSort"
                    class="text-xs font-medium text-neutral-700 bg-transparent border-none cursor-pointer focus:outline-none pr-5 py-1 appearance-none"
                    style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23666%22 stroke-width=%222.5%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22m19.5 8.25-7.5 7.5-7.5-7.5%22/></svg>'); background-repeat: no-repeat; background-position: right 0 center;"
                    @change="onSortChange($event)"
                  >
                    <option v-for="option in sortOptions" :key="option" :value="option">
                      {{ t(`category.sorting.${option}`) }}
                    </option>
                  </select>
                </div>
                <div class="flex items-center gap-1.5">
                  <select
                    :value="currentPerPage"
                    class="text-xs font-medium text-neutral-700 bg-transparent border-none cursor-pointer focus:outline-none pr-5 py-1 appearance-none"
                    style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23666%22 stroke-width=%222.5%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22m19.5 8.25-7.5 7.5-7.5-7.5%22/></svg>'); background-repeat: no-repeat; background-position: right 0 center;"
                    @change="onPerPageChange($event)"
                  >
                    <option v-for="pp in perPageOptions" :key="pp" :value="pp">
                      {{ pp }} {{ t('filterBar.articles') }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Facet dropdown -->
          <Teleport to="body">
            <div v-if="openFacetId !== null" class="fixed inset-0 z-[9998]" @click="openFacetId = null" />
            <Transition name="dropdown-fade">
              <div
                v-if="openFacetId !== null && openFacetFilters.length"
                class="fixed z-[9999] bg-white rounded-lg border border-neutral-200 shadow-lg shadow-black/8 min-w-[240px] max-h-[320px] overflow-y-auto"
                :style="dropdownStyle"
              >
                <div class="p-2">
                  <label
                    v-for="(filter, fi) in openFacetFilters"
                    :key="fi"
                    class="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-neutral-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      :checked="isFilterSelected(filter)"
                      class="w-4 h-4 rounded border-neutral-300 text-[#384d37] focus:ring-[#384d37] cursor-pointer"
                      @change="onFilterToggle(filter)"
                    >
                    <span class="text-sm text-neutral-700 flex-1">{{ filter.name ?? '' }}</span>
                    <span class="text-[11px] text-neutral-400 font-medium">{{ filter.count ?? 0 }}</span>
                  </label>
                </div>
              </div>
            </Transition>
          </Teleport>

          <!-- Product count -->
          <div class="flex justify-between items-center mb-6">
            <span class="font-bold md:text-lg">
              {{ t('search.numberOfProducts', { count: productsCatalog.products?.length ?? 0, total: productsCatalog.pagination.totals }) }}
            </span>
          </div>

          <!-- Product grid -->
          <section
            v-if="productsCatalog.products?.length"
            class="grid grid-cols-1 2xs:grid-cols-2 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 mb-10 md:mb-5"
            data-testid="category-grid"
          >
            <NuxtLazyHydrate
              v-for="(product, index) in productsCatalog.products"
              :key="productGetters.getVariationId(product)"
              when-visible
            >
              <UiProductCard
                :product="product"
                :name="productGetters.getName(product) ?? ''"
                :rating-count="productGetters.getTotalReviews(product)"
                :rating="productGetters.getAverageRating(product, 'half')"
                :image-url="addModernImageExtension(productGetters.getCoverImage(product))"
                :image-alt="productImageGetters.getImageAlternate(productImageGetters.getFirstImage(product)) || productGetters.getName(product) || ''"
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

          <!-- Price info -->
          <div v-if="productsCatalog.pagination.totals > 0" class="mt-4 mb-4 typography-text-xs flex gap-1">
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

          <!-- Pagination -->
          <UiPagination
            v-if="productsCatalog.pagination.totals > 0"
            :key="`${productsCatalog.pagination.totals}-${productsPerPage}`"
            :current-page="getFacetsFromURL().page ?? 1"
            :total-items="productsCatalog.pagination.totals"
            :page-size="Number(productsPerPage)"
            :max-visible-pages="maxVisiblePages"
          />
        </NarrowContainer>
      </template>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { facetGetters, productGetters, productImageGetters } from '@plentymarkets/shop-api';
import type { Filter, FilterGroup } from '@plentymarkets/shop-api';
import { SfLoaderCircular, SfLink } from '@storefront-ui/vue';
import type { Locale } from '#i18n';
import type { Filters } from '~/composables';
import { defaults } from '~/composables';
import { paths } from '~/utils/paths';

defineI18nRoute({
  locales: process.env.LANGUAGELIST?.split(',') as Locale[],
});

const { getRobots, setRobotForStaticPage } = useRobots();

definePageMeta({
  layout: false,
  type: 'search',
});

const route = useRoute();
const localePath = useLocalePath();
const viewport = useViewport();
const { t } = useI18n();
const { getSearch, data: productsCatalog, productsPerPage, loading } = useSearch();
const { getFacetsFromURL, updateFilters: updateCategoryFilters, updateSorting, updateItemsPerPage } = useCategoryFilter();
const { addModernImageExtension } = useModernImage();
const { showNetPrices } = useCart();
const { getJsonSetting: availableSortingOptions } = useSiteSettings('availableSortingOptions');
const { getSetting: defaultSortingSearch } = useSiteSettings('defaultSortingSearch');

const maxVisiblePages = computed(() => (viewport.isGreaterOrEquals('lg') ? 5 : 2));

const handleQueryUpdate = async () => {
  await getSearch(getFacetsFromURL());
};

await handleQueryUpdate();

watch(
  () => route.query,
  async () => {
    handleQueryUpdate();
  },
);

await getRobots();
setRobotForStaticPage('SearchResult');

// Filter bar logic
const openFacetId = ref<string | number | null>(null);
const dropdownStyle = ref<Record<string, string>>({});
const facetButtonRefs = ref<HTMLElement[]>([]);

const hasFacets = computed(() => productsCatalog.value && facetGetters.hasFilters(productsCatalog.value.facets));

const dynamicFacets = computed(() => {
  if (!productsCatalog.value?.facets) return [];
  return productsCatalog.value.facets.filter((f: FilterGroup) => {
    const type = facetGetters.getType(f);
    return type === 'dynamic' || type === 'producer';
  });
});

const sortOptions = computed<string[]>(() => availableSortingOptions());
const currentSort = computed(() => {
  const q = route.query.sort;
  const val = typeof q === 'string' ? q : '';
  if (val && sortOptions.value.includes(val)) return val;
  const def = defaultSortingSearch();
  return (def && sortOptions.value.includes(def) ? def : sortOptions.value[0]) ?? '';
});
const onSortChange = (e: Event) => {
  const val = (e.target as HTMLSelectElement).value;
  if (val) updateSorting(val);
};

const perPageOptions = defaults.PER_PAGE_STEPS;
const currentPerPage = computed(() => {
  return getFacetsFromURL().itemsPerPage?.toString() || defaults.DEFAULT_ITEMS_PER_PAGE.toString();
});
const onPerPageChange = (e: Event) => {
  const val = Number((e.target as HTMLSelectElement).value);
  if (val) updateItemsPerPage(val);
};

const getFacetId = (facet: FilterGroup): string | number => {
  return facet.id ?? facetGetters.getName(facet);
};

const toggleFacetDropdown = (facet: FilterGroup, event: MouseEvent) => {
  const id = getFacetId(facet);
  if (openFacetId.value === id) {
    openFacetId.value = null;
    return;
  }
  openFacetId.value = id;
  const btn = event.currentTarget as HTMLElement;
  if (btn) {
    const rect = btn.getBoundingClientRect();
    dropdownStyle.value = {
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`,
    };
  }
};

const openFacetFilters = computed(() => {
  if (!openFacetId.value || !productsCatalog.value?.facets) return [];
  const facet = productsCatalog.value.facets.find((f: FilterGroup) => getFacetId(f) === openFacetId.value);
  return facet ? facetGetters.getFilters(facet) : [];
});

const isFilterSelected = (filter: Filter): boolean => {
  const currentFacets = getFacetsFromURL().facets?.split(',') ?? [];
  const filterId = typeof filter.id === 'string' ? filter.id : filter.id.toString();
  return currentFacets.includes(filterId);
};

const onFilterToggle = (filter: Filter) => {
  const filterId = typeof filter.id === 'string' ? filter.id : filter.id.toString();
  const currentFacets = getFacetsFromURL().facets?.split(',').filter(Boolean) ?? [];
  const filters: Filters = {};
  for (const fid of currentFacets) {
    filters[fid] = true;
  }
  filters[filterId] = !filters[filterId];
  updateCategoryFilters(filters);
};
</script>

<style scoped>
.dropdown-fade-enter-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-fade-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}
.dropdown-fade-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

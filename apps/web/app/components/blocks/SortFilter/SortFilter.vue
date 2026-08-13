<template>
  <div v-if="showSortAndFilter" data-testid="category-sort-filter">
    <!-- DESKTOP: horizontal filter bar -->
    <div class="hidden lg:block bg-neutral-50 border-y border-neutral-100 mb-[10px]">
      <div class="flex items-center justify-between px-2 py-2 gap-3">
        <div class="flex items-center gap-1 flex-wrap">
          <span class="text-xs font-semibold text-neutral-500 mr-1 whitespace-nowrap">{{ t('filterBar.filterBy') }}:</span>
          <template v-for="facet in dynamicFacets" :key="facetGetters.getName(facet)">
            <div ref="facetButtonRefs" class="relative">
              <button
                type="button"
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                :class="openFacetId === getFacetId(facet) ? 'bg-[#384d37] text-white' : 'text-neutral-700 hover:bg-neutral-100'"
                :data-facet-id="getFacetId(facet)"
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

    <!-- MOBILE: Filter / Sort trigger buttons -->
    <div class="lg:hidden grid grid-cols-2 gap-2 px-2 mb-[10px]">
      <button
        type="button"
        class="relative flex items-center justify-center gap-2 py-2.5 rounded-lg border border-neutral-200 bg-white text-sm font-semibold text-neutral-800 active:bg-neutral-50 transition-colors"
        @click="openSheet('filter')"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" /></svg>
        {{ t('filterBar.filter') }}
        <span v-if="activeFilterCount" class="absolute top-1.5 right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#384d37] text-white text-[10px] font-bold flex items-center justify-center">{{ activeFilterCount }}</span>
      </button>
      <button
        type="button"
        class="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-neutral-200 bg-white text-sm font-semibold text-neutral-800 active:bg-neutral-50 transition-colors"
        @click="openSheet('sort')"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>
        {{ t('filterBar.sort') }}
      </button>
    </div>

    <!-- DESKTOP facet dropdown -->
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

    <!-- MOBILE bottom sheet -->
    <Teleport to="body">
      <Transition name="sheet">
        <div v-if="mobileSheet" class="lg:hidden fixed inset-0 z-[9999]">
          <div class="absolute inset-0 bg-black/40" @click="closeSheet" />
          <div class="sheet-panel absolute inset-x-0 bottom-0 flex flex-col max-h-[85vh] bg-white rounded-t-2xl shadow-2xl">
            <!-- header -->
            <div class="shrink-0 px-4 pt-3 pb-3 border-b border-neutral-100">
              <div class="w-10 h-1 rounded-full bg-neutral-200 mx-auto mb-3" />
              <div class="flex items-center justify-between">
                <h3 class="text-base font-bold text-neutral-900">
                  {{ mobileSheet === 'sort' ? t('filterBar.sort') : t('filterBar.filter') }}
                </h3>
                <button type="button" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-500" :aria-label="t('filterBar.apply')" @click="closeSheet">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <!-- body -->
            <div class="flex-1 overflow-y-auto overscroll-contain">
              <!-- SORT mode -->
              <template v-if="mobileSheet === 'sort'">
                <div class="p-2">
                  <button
                    v-for="option in sortOptions"
                    :key="option"
                    type="button"
                    class="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-colors"
                    :class="currentSort === option ? 'bg-[#384d37]/8 text-[#384d37] font-semibold' : 'text-neutral-700 active:bg-neutral-50'"
                    @click="selectSort(option)"
                  >
                    <span>{{ t(`category.sorting.${option}`) }}</span>
                    <svg v-if="currentSort === option" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  </button>
                </div>
                <div class="border-t border-neutral-100 p-2">
                  <p class="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">{{ t('filterBar.perPage') }}</p>
                  <button
                    v-for="pp in perPageOptions"
                    :key="pp"
                    type="button"
                    class="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-colors"
                    :class="String(currentPerPage) === String(pp) ? 'bg-[#384d37]/8 text-[#384d37] font-semibold' : 'text-neutral-700 active:bg-neutral-50'"
                    @click="selectPerPage(pp)"
                  >
                    <span>{{ pp }} {{ t('filterBar.articles') }}</span>
                    <svg v-if="String(currentPerPage) === String(pp)" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  </button>
                </div>
              </template>

              <!-- FILTER mode: facet accordions -->
              <template v-else>
                <div v-for="facet in dynamicFacets" :key="getFacetId(facet)" class="border-b border-neutral-100 last:border-0">
                  <button
                    type="button"
                    class="w-full flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-neutral-800"
                    @click="toggleAccordion(getFacetId(facet))"
                  >
                    <span class="flex items-center gap-2">
                      {{ facetGetters.getName(facet) }}
                      <span v-if="facetSelectedCount(facet)" class="min-w-[18px] h-[18px] px-1 rounded-full bg-[#384d37] text-white text-[10px] font-bold inline-flex items-center justify-center">{{ facetSelectedCount(facet) }}</span>
                    </span>
                    <svg class="w-4 h-4 text-neutral-400 transition-transform" :class="expandedFacet === getFacetId(facet) ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                  </button>
                  <div v-if="expandedFacet === getFacetId(facet)" class="px-2 pb-2">
                    <label
                      v-for="(filter, fi) in facetGetters.getFilters(facet)"
                      :key="fi"
                      class="flex items-center gap-3 px-2.5 py-2.5 rounded-lg active:bg-neutral-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        :checked="isFilterSelected(filter)"
                        class="w-5 h-5 rounded border-neutral-300 text-[#384d37] focus:ring-[#384d37]"
                        @change="onFilterToggle(filter)"
                      >
                      <span class="text-sm text-neutral-700 flex-1">{{ filter.name ?? '' }}</span>
                      <span class="text-[11px] text-neutral-400 font-medium">{{ filter.count ?? 0 }}</span>
                    </label>
                  </div>
                </div>
              </template>
            </div>

            <!-- footer -->
            <div class="shrink-0 border-t border-neutral-100 p-3 flex gap-2" :style="{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }">
              <button
                v-if="mobileSheet === 'filter'"
                type="button"
                class="flex-1 py-3 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 active:bg-neutral-50 transition-colors disabled:opacity-40"
                :disabled="!activeFilterCount"
                @click="clearAllFilters"
              >
                {{ t('filterBar.reset') }}
              </button>
              <button
                type="button"
                class="flex-1 py-3 rounded-xl bg-[#384d37] text-white text-sm font-semibold active:bg-[#2c3e2b] transition-colors"
                @click="closeSheet"
              >
                {{ t('filterBar.apply') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>

  <div v-else-if="clientPreview" class="text-center">
    <h2>{{ getEditorTranslation('no-sorting-or-filter-text') }}</h2>
  </div>
</template>

<script setup lang="ts">
import { type Filter, type FilterGroup, facetGetters } from '@plentymarkets/shop-api';
import type { SortFilterProps, SortFilterFieldsVisibility } from './types';
import type { Filters } from '~/composables';
import { defaults } from '~/composables';
import { isPageOfType } from '~/utils/pathHelper';

const { data: productsCatalog } = useProducts();
const { getFacetsFromURL, updateFilters: updateCategoryFilters, updateSorting, updateItemsPerPage } = useCategoryFilter();
const { getJsonSetting: availableSortingOptions } = useSiteSettings('availableSortingOptions');
const { getSetting: defaultSortingOption } = useSiteSettings('defaultSortingOption');
const { getSetting: defaultSortingSearch } = useSiteSettings('defaultSortingSearch');
const route = useRoute();

const props = defineProps<SortFilterProps>();

const showSortAndFilter = ref(false);
const { t } = useI18n({ useScope: 'global' });

const { isInEditorClient } = useEditorState();
const clientPreview = computed(() => isInEditorClient.value);

const openFacetId = ref<string | number | null>(null);
const dropdownStyle = ref<Record<string, string>>({});
const facetButtonRefs = ref<HTMLElement[]>([]);

// Mobile bottom sheet
const mobileSheet = ref<null | 'filter' | 'sort'>(null);
const expandedFacet = ref<string | number | null>(null);

const sortOptions = computed<string[]>(() => availableSortingOptions());
const defaultSort = computed(() => (isPageOfType('search') ? defaultSortingSearch() : defaultSortingOption()));
const currentSort = computed(() => {
  const q = route.query.sort;
  const val = typeof q === 'string' ? q : '';
  if (val && sortOptions.value.includes(val)) return val;
  return (defaultSort.value && sortOptions.value.includes(defaultSort.value) ? defaultSort.value : sortOptions.value[0]) ?? '';
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

const dynamicFacets = computed(() => {
  if (!productsCatalog.value.facets) return [];
  return productsCatalog.value.facets.filter((f: FilterGroup) => {
    const type = facetGetters.getType(f);
    return type === 'dynamic' || type === 'producer';
  });
});

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
  if (!openFacetId.value || !productsCatalog.value.facets) return [];
  const facet = productsCatalog.value.facets.find((f: FilterGroup) => getFacetId(f) === openFacetId.value);
  return facet ? facetGetters.getFilters(facet) : [];
});

const currentFacetIds = () => getFacetsFromURL().facets?.split(',').filter(Boolean) ?? [];

const isFilterSelected = (filter: Filter): boolean => {
  const filterId = typeof filter.id === 'string' ? filter.id : filter.id.toString();
  return currentFacetIds().includes(filterId);
};

const onFilterToggle = (filter: Filter) => {
  const filterId = typeof filter.id === 'string' ? filter.id : filter.id.toString();
  const filters: Filters = {};
  for (const fid of currentFacetIds()) {
    filters[fid] = true;
  }
  filters[filterId] = !filters[filterId];
  updateCategoryFilters(filters);
};

// Mobile helpers
const activeFilterCount = computed(() => currentFacetIds().length);

const facetSelectedCount = (facet: FilterGroup): number => {
  const current = currentFacetIds();
  return facetGetters.getFilters(facet).filter((f: Filter) => {
    const fid = typeof f.id === 'string' ? f.id : f.id.toString();
    return current.includes(fid);
  }).length;
};

const openSheet = (mode: 'filter' | 'sort') => {
  mobileSheet.value = mode;
  if (mode === 'filter' && expandedFacet.value === null) {
    const first = dynamicFacets.value[0];
    if (first) expandedFacet.value = getFacetId(first);
  }
};
const closeSheet = () => {
  mobileSheet.value = null;
};
const toggleAccordion = (id: string | number) => {
  expandedFacet.value = expandedFacet.value === id ? null : id;
};
const selectSort = (option: string) => {
  updateSorting(option);
  closeSheet();
};
const selectPerPage = (pp: number) => {
  updateItemsPerPage(pp);
  closeSheet();
};
const clearAllFilters = () => {
  const filters: Filters = {};
  for (const fid of currentFacetIds()) {
    filters[fid] = false;
  }
  updateCategoryFilters(filters);
};

watch(mobileSheet, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : '';
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = '';
});

watch(
  () => props.content?.fields,
  (newValue) => {
    showSortAndFilter.value = !!newValue && Object.values(newValue as SortFilterFieldsVisibility).some(Boolean);
  },
  { deep: true, immediate: true },
);
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

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.25s ease;
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-active .sheet-panel,
.sheet-leave-active .sheet-panel {
  transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1);
}
.sheet-enter-from .sheet-panel,
.sheet-leave-to .sheet-panel {
  transform: translateY(100%);
}
</style>

<i18n lang="json">
{
  "en": {
    "no-sorting-or-filter-text": "You do not have any sorting or filter options enabled"
  },
  "de": {
    "no-sorting-or-filter-text": "You do not have any sorting or filter options enabled"
  }
}
</i18n>

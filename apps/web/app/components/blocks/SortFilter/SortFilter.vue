<template>
  <div v-if="showSortAndFilter" data-testid="category-sort-filter">
    <!-- Yatay filtre seridi -->
    <div class="bg-neutral-50 border-y border-neutral-100 mb-[10px]">
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

const sortOptions = computed<string[]>(() => availableSortingOptions());
const defaultSort = computed(() => isPageOfType('search') ? defaultSortingSearch() : defaultSortingOption());
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
  const btn = (event.currentTarget as HTMLElement);
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

<template>
  <div
    v-if="productGetters.possibleUnitCombination(product).length > 1"
    class="mb-4"
    data-testing="variation-select-unit-wrapper"
  >
    <div class="rounded-xl border border-neutral-200 overflow-hidden">
      <div class="flex items-center gap-2 px-3.5 py-2.5 bg-neutral-50 border-b border-neutral-100">
        <svg class="w-3.5 h-3.5 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>
        <span class="text-xs font-semibold text-neutral-500 uppercase tracking-wider" data-testing="variation-select-unit-label">
          {{ t('common.labels.content') }}
        </span>
      </div>
      <div class="flex flex-wrap gap-2 p-3">
        <button
          v-for="unit in productGetters.possibleUnitCombination(product)"
          :key="unit.variationId"
          type="button"
          class="px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-150 cursor-pointer"
          :class="unit.variationId.toString() === selectedUnit
            ? 'border-[#384d37] bg-[#384d37]/5 text-[#384d37] shadow-sm'
            : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#384d37]/30 hover:bg-neutral-50'"
          @click="onChange(unit.variationId)"
        >
          {{ unit.unitName }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Product, productGetters } from '@plentymarkets/shop-api';

const props = defineProps<{
  product: Product;
}>();

const route = useRoute();
const { productParams } = createProductParams(route.params);
const { buildProductLanguagePath } = useLocalization();

const selectedUnit = ref(productParams?.variationId?.toString() || '');

function onChange(value: number) {
  navigateTo({
    path: buildProductLanguagePath(
      `/${productGetters.getUrlPath(props.product)}_${productGetters.getItemId(props.product)}_${value}`,
    ),
    query: route.query,
  });
}
</script>

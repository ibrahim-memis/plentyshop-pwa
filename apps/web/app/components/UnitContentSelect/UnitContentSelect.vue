<template>
  <div
    v-if="productGetters.possibleUnitCombination(product).length > 1"
    class="mb-4"
    data-testing="variation-select-unit-wrapper"
  >
    <p class="text-xs text-neutral-500 mb-2" data-testing="variation-select-unit-label">
      {{ t('common.labels.content') }}
    </p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="unit in productGetters.possibleUnitCombination(product)"
        :key="unit.variationId"
        type="button"
        class="px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-150 cursor-pointer"
        :class="unit.variationId.toString() === selectedUnit
          ? 'border-[#384d37] bg-[#384d37]/5 text-[#384d37]'
          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'"
        @click="onChange(unit.variationId)"
      >
        {{ unit.unitName }}
      </button>
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

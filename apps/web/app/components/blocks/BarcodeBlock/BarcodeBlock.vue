<template>
  <div :style="inlineStyle" data-testid="barcode-block">
    <template v-if="hasBarcodes">
      <div v-if="displayAsCollapsable" class="border-t border-neutral-200">
        <UiAccordionItem
          v-model="isOpen"
          summary-class="w-full py-5 px-0 flex justify-between items-center select-none group cursor-pointer"
          data-testid="barcode-accordion"
        >
          <template #summary>
            <h2 class="font-semibold text-base md:text-lg text-neutral-900">
              {{ content.text.title }}
            </h2>
          </template>
          <div class="pb-5">
            <table class="w-full text-sm">
              <tbody>
                <tr
                  v-for="barcode in barcodeRows"
                  :key="barcodeGetters.getId(barcode.raw)"
                  class="border-b border-neutral-100 last:border-b-0"
                >
                  <td class="py-2.5 pr-4 text-neutral-500 font-medium whitespace-nowrap align-top w-[40%]">
                    {{ barcode.label }}
                  </td>
                  <td class="py-2.5 text-neutral-800 font-mono text-xs tracking-wider">
                    {{ barcode.value }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </UiAccordionItem>
      </div>

      <div v-else class="border-t border-neutral-200">
        <h2 class="font-semibold text-base md:text-lg text-neutral-900 py-5">
          {{ content.text.title }}
        </h2>
        <div class="pb-5">
          <table class="w-full text-sm">
            <tbody>
              <tr
                v-for="barcode in barcodeRows"
                :key="barcodeGetters.getId(barcode.raw)"
                class="border-b border-neutral-100 last:border-b-0"
              >
                <td class="py-2.5 pr-4 text-neutral-500 font-medium whitespace-nowrap align-top w-[40%]">
                  {{ barcode.label }}
                </td>
                <td class="py-2.5 text-neutral-800 font-mono text-xs tracking-wider">
                  {{ barcode.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { productGetters, barcodeGetters } from '@plentymarkets/shop-api';
import type { Product, Barcode } from '@plentymarkets/shop-api';

interface BarcodeBlockProps {
  content: {
    text: { title: string };
    layout: {
      displayAsCollapsable?: boolean;
      initiallyCollapsed?: boolean;
      paddingTop?: number;
      paddingBottom?: number;
      paddingLeft?: number;
      paddingRight?: number;
    };
  };
  meta: { uuid: string };
}

const props = defineProps<BarcodeBlockProps>();
const { currentProduct } = useProducts();

const isOpen = ref(!(props.content.layout?.initiallyCollapsed ?? false));
const displayAsCollapsable = computed(() => props.content.layout?.displayAsCollapsable ?? true);

const barcodeRows = computed(() => {
  const product = currentProduct.value as Product;
  if (!product?.item) return [];

  const barcodes = productGetters.getBarcodes(product);
  if (!barcodes || !Array.isArray(barcodes)) return [];

  return barcodes
    .filter((b: Barcode) => barcodeGetters.getCode(b))
    .map((b: Barcode) => ({
      label: barcodeGetters.getName(b) || barcodeGetters.getType(b) || 'Barcode',
      value: barcodeGetters.getCode(b),
      raw: b,
    }));
});

const hasBarcodes = computed(() => barcodeRows.value.length > 0);

const inlineStyle = computed(() => {
  const layout = props.content.layout || {};
  return {
    paddingTop: layout.paddingTop ? `${layout.paddingTop}px` : 0,
    paddingBottom: layout.paddingBottom ? `${layout.paddingBottom}px` : 0,
    paddingLeft: layout.paddingLeft ? `${layout.paddingLeft}px` : 0,
    paddingRight: layout.paddingRight ? `${layout.paddingRight}px` : 0,
  };
});

const { registerBlockVisibility } = useBlocksVisibility();

watch(
  hasBarcodes,
  (val) => {
    registerBlockVisibility(props.meta.uuid, val);
  },
  { immediate: true },
);
</script>

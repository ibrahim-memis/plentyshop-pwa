<template>
  <div :style="inlineStyle" data-testid="item-text-block">
    <div v-if="displayAsCollapsable">
      <div v-if="text" class="border-t border-neutral-200">
        <UiAccordionItem
          v-model="initiallyCollapsed"
          summary-class="w-full py-5 px-0 flex justify-between items-center select-none group cursor-pointer"
          data-testid="item-text"
        >
          <template #summary>
            <h2 class="font-semibold text-base md:text-lg text-neutral-900">
              {{ content.text.title }}
            </h2>
          </template>
          <div
            v-if="text"
            data-testid="item-text-innertext"
            class="no-preflight text-sm text-neutral-600 leading-relaxed pb-5 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0"
            v-html="text"
          />
        </UiAccordionItem>
      </div>
    </div>
    <div v-else>
      <div class="border-t border-neutral-200">
        <h2 class="font-semibold text-base md:text-lg text-neutral-900 py-5">
          {{ content.text.title }}
        </h2>
        <div v-if="text" class="no-preflight text-sm text-neutral-600 leading-relaxed pb-5 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0" v-html="text" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import type { ItemTextProps } from './types';

const props = defineProps<ItemTextProps>();
const initiallyCollapsed = ref(!(props.content?.layout?.initiallyCollapsed ?? false));
const displayAsCollapsable = computed(() => props.content?.layout.displayAsCollapsable);

watch(
  () => props.content?.layout?.initiallyCollapsed,
  (val) => {
    if (val === undefined) return;
    initiallyCollapsed.value = !(val ?? false);
  },
);
const { currentProduct } = useProducts();
const content = computed(() => props.content);
const text = computed(() => currentProduct.value?.item ? productGetters.getDescription(currentProduct.value) : '');
const inlineStyle = computed(() => {
  const layout = props.content?.layout || {};
  return {
    paddingTop: layout.paddingTop ? `${layout.paddingTop}px` : 0,
    paddingBottom: layout.paddingBottom ? `${layout.paddingBottom}px` : 0,
    paddingLeft: layout.paddingLeft ? `${layout.paddingLeft}px` : 0,
    paddingRight: layout.paddingRight ? `${layout.paddingRight}px` : 0,
  };
});

const { registerBlockVisibility } = useBlocksVisibility();

watch(
  text,
  (newText) => {
    registerBlockVisibility(props.meta.uuid, newText?.length > 0);
  },
  { immediate: true },
);
</script>

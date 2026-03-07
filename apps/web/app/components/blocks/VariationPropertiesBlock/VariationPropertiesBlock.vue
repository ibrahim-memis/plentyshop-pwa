<template>
  <div :style="inlineStyle" data-testid="variation-properties-block">
    <template v-if="hasProperties">
      <div v-if="displayAsCollapsable" class="border-t border-neutral-200">
        <UiAccordionItem
          v-model="isOpen"
          summary-class="w-full py-5 px-0 flex justify-between items-center select-none group cursor-pointer"
          data-testid="variation-properties-accordion"
        >
          <template #summary>
            <h2 class="font-semibold text-base md:text-lg text-neutral-900">
              {{ content.text.title }}
            </h2>
          </template>
          <div class="pb-5">
            <template v-for="group in propertyGroups" :key="group.id">
              <!-- Grup baslik (birden fazla grup varsa) -->
              <h3
                v-if="propertyGroups.length > 1 && productPropertyGetters.getGroupName(group)"
                class="text-sm font-semibold text-neutral-700 mb-2 mt-3 first:mt-0"
              >
                {{ productPropertyGetters.getGroupName(group) }}
              </h3>
              <table class="w-full text-sm mb-3 last:mb-0">
                <tbody>
                  <tr
                    v-for="prop in getGroupProperties(group)"
                    :key="productPropertyGetters.getPropertyId(prop)"
                    class="border-b border-neutral-100 last:border-b-0"
                  >
                    <td class="py-2.5 pr-4 text-neutral-500 font-medium whitespace-nowrap align-top w-[40%]">
                      {{ productPropertyGetters.getPropertyName(prop) }}
                    </td>
                    <td class="py-2.5 text-neutral-800">
                      {{ productPropertyGetters.getPropertyValue(prop) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
          </div>
        </UiAccordionItem>
      </div>

      <div v-else class="border-t border-neutral-200">
        <h2 class="font-semibold text-base md:text-lg text-neutral-900 py-5">
          {{ content.text.title }}
        </h2>
        <div class="pb-5">
          <template v-for="group in propertyGroups" :key="group.id">
            <h3
              v-if="propertyGroups.length > 1 && productPropertyGetters.getGroupName(group)"
              class="text-sm font-semibold text-neutral-700 mb-2 mt-3 first:mt-0"
            >
              {{ productPropertyGetters.getGroupName(group) }}
            </h3>
            <table class="w-full text-sm mb-3 last:mb-0">
              <tbody>
                <tr
                  v-for="prop in getGroupProperties(group)"
                  :key="productPropertyGetters.getPropertyId(prop)"
                  class="border-b border-neutral-100 last:border-b-0"
                >
                  <td class="py-2.5 pr-4 text-neutral-500 font-medium whitespace-nowrap align-top w-[40%]">
                    {{ productPropertyGetters.getPropertyName(prop) }}
                  </td>
                  <td class="py-2.5 text-neutral-800">
                    {{ productPropertyGetters.getPropertyValue(prop) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { productGetters, productPropertyGetters } from '@plentymarkets/shop-api';
import type { Product, VariationPropertyGroup } from '@plentymarkets/shop-api';

interface VariationPropertiesBlockProps {
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

const props = defineProps<VariationPropertiesBlockProps>();
const { currentProduct } = useProducts();

const isOpen = ref(!(props.content.layout?.initiallyCollapsed ?? false));
const displayAsCollapsable = computed(() => props.content.layout?.displayAsCollapsable ?? true);

const propertyGroups = computed((): VariationPropertyGroup[] => {
  const product = currentProduct.value as Product;
  if (!product?.item) return [];
  const groups = productGetters.getPropertyGroups(product);
  if (!groups || !Array.isArray(groups)) return [];

  // Sadece icinde deger olan property'leri olan gruplari filtrele
  return groups.filter((g) => {
    const properties = productPropertyGetters.getProperties(g);
    return properties.some(
      (p) => productPropertyGetters.getPropertyName(p) && productPropertyGetters.getPropertyValue(p),
    );
  });
});

const getGroupProperties = (group: VariationPropertyGroup) => {
  return productPropertyGetters.getProperties(group).filter(
    (p) => productPropertyGetters.getPropertyName(p) && productPropertyGetters.getPropertyValue(p),
  );
};

const hasProperties = computed(() => propertyGroups.value.length > 0);

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
  hasProperties,
  (val) => {
    registerBlockVisibility(props.meta.uuid, val);
  },
  { immediate: true },
);
</script>

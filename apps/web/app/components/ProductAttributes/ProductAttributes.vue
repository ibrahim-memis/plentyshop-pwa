<template>
  <div v-if="attributes.length > 0" data-testid="product-attributes" class="mb-2">
    <div v-for="(attribute, index) in attributes" :key="index" class="mb-3">
      <Component
        :is="componentsMapper[productAttributeGetters.getAttributeType(attribute)]"
        v-if="componentsMapper[productAttributeGetters.getAttributeType(attribute)]"
        :attribute="attribute"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductAttributesProps, ComponentsMapper } from './types';
import AttributeDropdown from './AttributeDropdown/AttributeDropdown.vue';
import AttributeBox from './AttributeBox/AttributeBox.vue';
import AttributeImage from './AttributeImage/AttributeImage.vue';
import { productAttributeGetters } from '@plentymarkets/shop-api';

/* HomeDeluxe stili: dropdown yerine box kutucuklari kullan */
const componentsMapper: ComponentsMapper = {
  dropdown: AttributeBox,
  box: AttributeBox,
  image: AttributeImage,
};

const { attributes, setAttribute } = useProductAttributes();
const props = defineProps<ProductAttributesProps>();
const route = useRoute();

const lastSegment = route.path.split('/').pop() ?? '';
const preSelect = lastSegment.split('_').length > 2;

let lastVariationId: number | null = null;

watch(
  () => props.product,
  (prod) => {
    if (!prod?.item || !prod?.variation) return;
    const vid = prod.variation.id;
    if (vid === lastVariationId) return;
    lastVariationId = vid;
    setAttribute(prod, preSelect);
  },
  { immediate: true },
);
</script>

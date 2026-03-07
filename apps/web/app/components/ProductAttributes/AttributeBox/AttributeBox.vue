<template>
  <div>
    <!-- Label: bold isim + secili deger -->
    <div class="flex items-baseline gap-1.5 mb-2">
      <label for="attribute-box" class="text-xs font-semibold text-neutral-800">
        {{ productAttributeGetters.getAttributeName(attribute) }}:
      </label>
      <span v-if="selectedValueName" class="text-xs text-neutral-500">
        {{ selectedValueName }}
      </span>
    </div>

    <!-- Kutucuklar: kompakt, inline -->
    <div id="attribute-box" class="flex flex-wrap gap-1.5">
      <button
        v-for="item in productAttributeGetters.getAttributeValues(attribute)"
        :key="productAttributeGetters.getAttributeValueId(item)"
        type="button"
        class="h-8 px-3 text-xs text-center border rounded-md cursor-pointer transition-all duration-150"
        :class="{
          'text-neutral-300 border-dashed border-neutral-200 cursor-not-allowed': productAttributeGetters.isAttributeValueDisabled(item),
          'border-neutral-800 bg-white text-neutral-900 font-medium': value === productAttributeGetters.getAttributeValueId(item),
          'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400': value !== productAttributeGetters.getAttributeValueId(item) && !productAttributeGetters.isAttributeValueDisabled(item),
          '!ring-negative-700 !border-negative-700 ring-1': Boolean(errors['selectedValue']),
        }"
        :disabled="productAttributeGetters.isAttributeValueDisabled(item)"
        @click="doUpdateValue(productAttributeGetters.getAttributeValueId(item))"
      >
        <SfTooltip :label="getLabel(item)" strategy="absolute" :show-arrow="true" placement="top">
          {{ productAttributeGetters.getAttributeValueName(item) }}
        </SfTooltip>
      </button>
    </div>
    <ErrorMessage as="span" name="selectedValue" class="flex text-negative-700 text-sm mt-2" />
  </div>
</template>

<script setup lang="ts">
import { SfTooltip } from '@storefront-ui/vue';
import type { AttributeSelectProps } from '../types';
import type { VariationMapProductAttributeValue } from '@plentymarkets/shop-api';
import { productAttributeGetters } from '@plentymarkets/shop-api';
import { object, number } from 'yup';
import { useForm, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';

const { updateValue, getValue } = useProductAttributes();
const { registerValidator, registerInvalidFields } = useValidatorAggregator('attributes');
const props = defineProps<AttributeSelectProps>();
const value = computed(() => getValue(props.attribute.attributeId));

const selectedValueName = computed(() => {
  if (!value.value) return '';
  const found = productAttributeGetters.getAttributeValues(props.attribute)
    .find((item: VariationMapProductAttributeValue) => productAttributeGetters.getAttributeValueId(item) === value.value);
  return found ? productAttributeGetters.getAttributeValueName(found) : '';
});

const getLabel = (item: VariationMapProductAttributeValue): string => {
  return productAttributeGetters.isAttributeValueDisabled(item) ? t('product.attributes.seeAvailableOptions') : '';
};

const validationSchema = toTypedSchema(
  object({
    selectedValue: number().required(t('error.requiredField')),
  }),
);

const { errors, defineField, validate, meta } = useForm({
  validationSchema: validationSchema,
});

registerValidator(validate);

const [selectedValue] = defineField('selectedValue');

const doUpdateValue = (value: number) => {
  updateValue(props.attribute.attributeId, value);
  selectedValue.value = getValue(props.attribute.attributeId);
};

const setValue = (value: number | undefined) => {
  selectedValue.value = value;
};

watch(
  value,
  (newVal) => {
    if (newVal) {
      setValue(newVal);
    }
  },
  { immediate: true },
);

watch(
  () => meta.value,
  () => {
    registerInvalidFields(
      meta.value.valid,
      `prop-${productAttributeGetters.getAttributeId(props.attribute)}`,
      productAttributeGetters.getAttributeName(props.attribute),
    );
  },
);
</script>

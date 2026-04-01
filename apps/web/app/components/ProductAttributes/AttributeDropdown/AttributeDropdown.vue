<template>
  <div>
    <p class="text-xs text-neutral-500 mb-2">
      {{ productAttributeGetters.getAttributeName(attribute) }}
    </p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="item in productAttributeGetters.getAttributeValues(attribute)"
        :key="productAttributeGetters.getAttributeValueId(item)"
        type="button"
        class="px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-150"
        :class="[
          productAttributeGetters.isAttributeValueDisabled(item)
            ? 'border-neutral-100 bg-neutral-50 text-neutral-300 cursor-not-allowed line-through'
            : value === productAttributeGetters.getAttributeValueId(item).toString()
              ? 'border-[#384d37] bg-[#384d37]/5 text-[#384d37] cursor-pointer'
              : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 cursor-pointer'
        ]"
        :disabled="productAttributeGetters.isAttributeValueDisabled(item)"
        @click="doUpdateValue(productAttributeGetters.getAttributeValueId(item))"
      >
        {{ productAttributeGetters.getAttributeValueName(item) }}
      </button>
    </div>
    <ErrorMessage as="span" name="selectedValue" class="flex text-negative-700 text-sm mt-2" />
  </div>
</template>

<script setup lang="ts">
import type { AttributeSelectProps } from '../types';
import { productAttributeGetters } from '@plentymarkets/shop-api';
import { number, object } from 'yup';
import { useForm, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';

const { attribute } = defineProps<AttributeSelectProps>();
const { updateValue, getValue } = useProductAttributes();
const { registerValidator, registerInvalidFields } = useValidatorAggregator('attributes');
const value = ref<string | undefined>(
  getValue(productAttributeGetters.getAttributeId(attribute))?.toString() ?? undefined,
);

watch(
  () => getValue(productAttributeGetters.getAttributeId(attribute)),
  () => {
    value.value = getValue(productAttributeGetters.getAttributeId(attribute))?.toString() ?? '-1';
  },
);

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
  if (value > -1) {
    updateValue(attribute.attributeId, value);
    selectedValue.value = getValue(attribute.attributeId);
  }
};

const setValue = (value: string | undefined) => {
  selectedValue.value = value ? Number(value) : undefined;
};

setValue(value.value);

watch(
  () => value.value,
  () => {
    setValue(value.value);
  },
);

watch(
  () => meta.value,
  () => {
    registerInvalidFields(
      meta.value.valid,
      `prop-${productAttributeGetters.getAttributeId(attribute)}`,
      productAttributeGetters.getAttributeName(attribute),
    );
  },
);
</script>

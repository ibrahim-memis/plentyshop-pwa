<template>
  <div>
    <label
      :for="'attribute-' + productAttributeGetters.getAttributeId(attribute)"
      class="leading-5 text-xs text-zinc-900 mb-2 block"
    >
      <span class="font-semibold">{{ productAttributeGetters.getAttributeName(attribute) }}</span>
      <span v-if="value" class="text-neutral-500"
        >: <b class="text-neutral-700">{{ selectedAttributeValueName }}</b></span
      >
    </label>
    <div :id="'attribute-' + productAttributeGetters.getAttributeId(attribute)" class="flex gap-2 flex-wrap">
      <SfTooltip
        v-for="item in productAttributeGetters.getAttributeValues(attribute)"
        :key="productAttributeGetters.getAttributeValueId(item)"
        :label="getLabel(item)"
        strategy="absolute"
        :show-arrow="true"
        placement="top"
      >
        <div
          class="w-10 h-10 rounded-full border-2 cursor-pointer overflow-hidden transition-all duration-150 hover:shadow-sm"
          :class="{
            'opacity-40 border-dashed border-neutral-200 cursor-not-allowed': productAttributeGetters.isAttributeValueDisabled(item),
            'border-neutral-800 ring-2 ring-neutral-800/20': value === productAttributeGetters.getAttributeValueId(item),
            'border-neutral-200 hover:border-neutral-400': value !== productAttributeGetters.getAttributeValueId(item) && !productAttributeGetters.isAttributeValueDisabled(item),
            '!ring-negative-700 !border-negative-700 ring-1': Boolean(errors['selectedValue']),
          }"
          @click="doUpdateValue(item)"
        >
          <NuxtImg
            :src="getImagePath(item)"
            :alt="productAttributeGetters.getAttributeValueName(item)"
            loading="lazy"
            class="w-full h-full object-cover"
          />
        </div>
      </SfTooltip>
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
const selectedAttributeValueName = ref<string>('');
const runtimeConfig = useRuntimeConfig();
const domain = runtimeConfig.public?.domain ?? '';

const getLabel = (item: VariationMapProductAttributeValue): string => {
  return productAttributeGetters.isAttributeValueDisabled(item)
    ? t('product.attributes.seeAvailableOptions')
    : productAttributeGetters.getAttributeValueName(item);
};

const getImagePath = (item: VariationMapProductAttributeValue): string => {
  const path = productAttributeGetters.getAttributeValueImageUrl(item);
  return path.startsWith('http') ? path : domain + path;
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

const doUpdateValue = (attribute: VariationMapProductAttributeValue) => {
  updateValue(
    productAttributeGetters.getAttributeId(props.attribute),
    productAttributeGetters.getAttributeValueId(attribute),
  );
  selectedValue.value = getValue(props.attribute.attributeId);
  selectedAttributeValueName.value = productAttributeGetters.getAttributeValueName(attribute);
};

const setValue = (value: number | undefined) => {
  const getAttributeValue = productAttributeGetters.getAttributeValueById(props.attribute, value || -1);
  selectedValue.value = value;
  selectedAttributeValueName.value = getAttributeValue
    ? productAttributeGetters.getAttributeValueName(getAttributeValue)
    : '';
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
      `prop-${productAttributeGetters.getAttributeId(props.attribute)}`,
      productAttributeGetters.getAttributeName(props.attribute),
    );
  },
);
</script>

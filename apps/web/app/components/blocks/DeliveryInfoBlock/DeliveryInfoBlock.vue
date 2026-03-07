<template>
  <div :style="inlineStyle" data-testid="delivery-info-block">
    <template v-if="hasRows">
      <div v-if="displayAsCollapsable" class="border-t border-neutral-200">
        <UiAccordionItem
          v-model="isOpen"
          summary-class="w-full py-5 px-0 flex justify-between items-center select-none group cursor-pointer"
          data-testid="delivery-info-accordion"
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
                  v-for="row in deliveryRows"
                  :key="row.label"
                  class="border-b border-neutral-100 last:border-b-0"
                >
                  <td class="py-2.5 pr-4 text-neutral-500 font-medium whitespace-nowrap align-top w-[40%]">
                    {{ row.label }}
                  </td>
                  <td class="py-2.5 text-neutral-800">
                    <span v-if="row.isAvailability" class="inline-flex items-center gap-1.5 text-sm" :class="row.badgeClass">
                      <span class="w-2 h-2 rounded-full shrink-0" :class="row.dotClass" />
                      {{ row.value }}
                    </span>
                    <span v-else>{{ row.value }}</span>
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
                v-for="row in deliveryRows"
                :key="row.label"
                class="border-b border-neutral-100 last:border-b-0"
              >
                <td class="py-2.5 pr-4 text-neutral-500 font-medium whitespace-nowrap align-top w-[40%]">
                  {{ row.label }}
                </td>
                <td class="py-2.5 text-neutral-800">
                  <span v-if="row.isAvailability" class="inline-flex items-center gap-1.5 text-sm" :class="row.badgeClass">
                    <span class="w-2 h-2 rounded-full shrink-0" :class="row.dotClass" />
                    {{ row.value }}
                  </span>
                  <span v-else>{{ row.value }}</span>
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
import { productGetters } from '@plentymarkets/shop-api';
import type { Product } from '@plentymarkets/shop-api';

interface DeliveryInfoBlockProps {
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

const props = defineProps<DeliveryInfoBlockProps>();
const { t } = useI18n();
const { currentProduct } = useProducts();

const isOpen = ref(!(props.content.layout?.initiallyCollapsed ?? false));
const displayAsCollapsable = computed(() => props.content.layout?.displayAsCollapsable ?? true);

interface DeliveryRow {
  label: string;
  value: string;
  isAvailability?: boolean;
  badgeClass?: string;
  dotClass?: string;
}

const deliveryRows = computed((): DeliveryRow[] => {
  const product = currentProduct.value as Product;
  if (!product?.variation) return [];

  const rows: DeliveryRow[] = [];

  // Availability
  const availName = productGetters.getAvailabilityName(product);
  if (availName) {
    const availId = productGetters.getAvailabilityId(product);
    let dotClass = 'bg-yellow-500';
    let badgeClass = '';

    if (availId !== undefined && availId !== null) {
      if (availId <= 2) {
        dotClass = 'bg-green-500';
        badgeClass = 'text-green-700';
      } else if (availId <= 4) {
        dotClass = 'bg-yellow-500';
        badgeClass = 'text-yellow-700';
      } else {
        dotClass = 'bg-red-500';
        badgeClass = 'text-red-700';
      }
    }

    rows.push({
      label: t('deliveryInfo.availability', 'Availability'),
      value: availName,
      isAvailability: true,
      badgeClass,
      dotClass,
    });
  }

  // Ortalama teslimat suresi
  const avgDays = productGetters.getAvailabilityAverageDays(product);
  if (avgDays && avgDays > 0) {
    rows.push({
      label: t('deliveryInfo.deliveryTime', 'Delivery time'),
      value: `${avgDays} ${t('deliveryInfo.days', 'days')}`,
    });
  }

  // Minimum siparis miktari
  const minQty = productGetters.getMinimumOrderQuantity(product);
  if (minQty && minQty > 1) {
    rows.push({
      label: t('deliveryInfo.minOrderQty', 'Min. order quantity'),
      value: String(minQty),
    });
  }

  // Kargo agirligi
  const weight = productGetters.getWeightG(product);
  if (weight && weight > 0) {
    const displayWeight = weight >= 1000 ? `${(weight / 1000).toFixed(2)} kg` : `${weight} g`;
    rows.push({
      label: t('deliveryInfo.weight', 'Shipping weight'),
      value: displayWeight,
    });
  }

  // Boyutlar
  const width = productGetters.getWidthMM(product);
  const height = productGetters.getHeightMM(product);
  const length = productGetters.getLengthMM(product);
  if ((width && width > 0) || (height && height > 0) || (length && length > 0)) {
    const dims = [length || 0, width || 0, height || 0].map((d) =>
      d >= 10 ? `${(d / 10).toFixed(1)} cm` : `${d} mm`,
    );
    rows.push({
      label: t('deliveryInfo.dimensions', 'Dimensions (L×W×H)'),
      value: dims.join(' × '),
    });
  }

  return rows;
});

const hasRows = computed(() => deliveryRows.value.length > 0);

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
  hasRows,
  (val) => {
    registerBlockVisibility(props.meta.uuid, val);
  },
  { immediate: true },
);
</script>

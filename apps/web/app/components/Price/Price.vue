<template>
  <div class="py-1 flex items-baseline gap-3 flex-wrap">
    <!-- Guncel fiyat: buyuk, bold -->
    <span class="text-neutral-900 font-bold text-3xl md:text-4xl tracking-tight" data-testid="price">
      {{ format(price) }}
    </span>
    <!-- B2B: Netto badge -->
    <span
      v-if="showNetBadge"
      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200"
    >
      {{ t('product.netLabel') }}
    </span>
    <!-- Eski fiyat: ayni satirda, kucuk, ustu cizili -->
    <span v-if="crossedPrice && differentPrices" class="text-lg text-neutral-400 line-through">
      {{ format(crossedPrice) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { PriceProps } from '~/components/Price/types';

const props = defineProps<PriceProps>();

const { format } = usePriceFormatter();

const differentPrices = computed(() => {
  return props.crossedPrice
    ? Math.round(props.price * 100) / 100 !== Math.round(props.crossedPrice * 100) / 100
    : false;
});
</script>

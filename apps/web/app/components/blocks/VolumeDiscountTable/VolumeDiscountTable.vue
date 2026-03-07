<template>
  <div class="volume-discount-section" data-testid="volume-discount-table">
    <!-- Başlık -->
    <div class="flex items-center gap-3 mb-5">
      <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50">
        <svg class="w-5 h-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      </div>
      <div>
        <h3 class="text-base font-bold text-neutral-900">{{ t('volumeDiscount.title') }}</h3>
        <p class="text-xs text-neutral-500">{{ t('volumeDiscount.subtitle') }}</p>
      </div>
    </div>

    <!-- Tablo -->
    <div class="rounded-lg border border-neutral-200 overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-neutral-50">
            <th class="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              {{ t('volumeDiscount.quantity') }}
            </th>
            <th class="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              {{ t('volumeDiscount.discount') }}
            </th>
            <th class="text-right px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              {{ t('volumeDiscount.savings') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(tier, index) in discountTiers"
            :key="index"
            class="border-t border-neutral-100 transition-colors hover:bg-primary-50/30"
            :class="{ 'bg-primary-50/50': tier.highlighted }"
          >
            <td class="px-4 py-3.5">
              <div class="flex items-center gap-2">
                <span class="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
                  :class="tier.highlighted ? 'bg-primary-100 text-primary-800' : 'bg-neutral-100 text-neutral-600'"
                >
                  {{ tier.quantity }}+
                </span>
                <span class="text-sm text-neutral-700">{{ t('volumeDiscount.pieces') }}</span>
              </div>
            </td>
            <td class="px-4 py-3.5">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
                :class="tier.highlighted
                  ? 'bg-green-100 text-green-800'
                  : 'bg-neutral-100 text-neutral-700'"
              >
                {{ tier.discount }}%
              </span>
            </td>
            <td class="px-4 py-3.5 text-right">
              <span class="text-sm font-medium" :class="tier.highlighted ? 'text-green-700' : 'text-neutral-600'">
                {{ tier.savingsText }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Alt bilgi -->
    <p class="mt-3 text-xs text-neutral-400 flex items-center gap-1.5">
      <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
      </svg>
      {{ t('volumeDiscount.info') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';

const { currentProduct } = useProducts();
const { format } = usePriceFormatter();
const { price } = useProductPrice(currentProduct.value);

const discountTiers = computed(() => {
  const basePrice = price.value || 0;

  const tiers = [
    { quantity: 2, discount: 5, highlighted: false },
    { quantity: 3, discount: 10, highlighted: false },
    { quantity: 5, discount: 15, highlighted: true },
    { quantity: 10, discount: 20, highlighted: false },
    { quantity: 25, discount: 25, highlighted: false },
  ];

  return tiers.map((tier) => {
    const savings = basePrice * tier.quantity * (tier.discount / 100);
    return {
      ...tier,
      savingsText: savings > 0 ? `${t('volumeDiscount.save')} ${format(savings)}` : '-',
    };
  });
});
</script>

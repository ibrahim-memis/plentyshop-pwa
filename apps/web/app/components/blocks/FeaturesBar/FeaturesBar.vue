<template>
  <div
    data-testid="features-bar-block"
    class="border-b border-neutral-100 bg-white"
  >
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8 py-6 md:py-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        <div
          v-for="(feature, idx) in features"
          :key="idx"
          class="flex items-center gap-4 group"
        >
          <div class="w-14 h-14 rounded-xl bg-[#384d37]/10 flex items-center justify-center shrink-0 group-hover:bg-[#384d37]/20 transition-all duration-200 ring-1 ring-[#384d37]/10">
            <component :is="feature.icon" class="w-7 h-7 text-[#384d37]" />
          </div>
          <div class="min-w-0">
            <h4 class="text-sm font-bold text-neutral-900 leading-tight">{{ feature.title }}</h4>
            <p class="text-xs text-neutral-600 mt-0.5 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

// B2B: Toptan fiyat / staffelpreise ikonu
const PriceTagIcon = defineComponent({
  render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '1.5' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z' }),
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M6 6h.008v.008H6V6Z' }),
  ]),
});

// B2B: Fatura ile odeme ikonu
const DocumentIcon = defineComponent({
  render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '1.5' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z' }),
  ]),
});

// B2B: Kisisel danismanlik ikonu
const HeadsetIcon = defineComponent({
  render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '1.5' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155' }),
  ]),
});

// B2B: Hizli teslimat ikonu
const TruckIcon = defineComponent({
  render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': '1.5' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H21M3.375 14.25h4.875c.621 0 1.125-.504 1.125-1.125V4.5h8.25a1.125 1.125 0 0 1 .861.408l2.877 3.453a1.125 1.125 0 0 1 .264.723V14.25m-18 0V5.625A1.125 1.125 0 0 1 4.5 4.5h2.25' }),
  ]),
});

const features = computed(() => [
  {
    icon: PriceTagIcon,
    title: t('featuresBar.volumeDiscount.title'),
    description: t('featuresBar.volumeDiscount.desc'),
  },
  {
    icon: DocumentIcon,
    title: t('featuresBar.invoice.title'),
    description: t('featuresBar.invoice.desc'),
  },
  {
    icon: HeadsetIcon,
    title: t('featuresBar.accountManager.title'),
    description: t('featuresBar.accountManager.desc'),
  },
  {
    icon: TruckIcon,
    title: t('featuresBar.expressShipping.title'),
    description: t('featuresBar.expressShipping.desc'),
  },
]);
</script>

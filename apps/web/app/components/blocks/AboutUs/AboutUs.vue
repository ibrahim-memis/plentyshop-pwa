<template>
  <div data-testid="about-us-block" class="bg-white">
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8 py-16 md:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div class="order-2 lg:order-1">
          <span class="inline-block text-xs font-semibold text-[#384d37] uppercase tracking-widest mb-4">
            {{ t('aboutUs.label') }}
          </span>
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight leading-tight mb-5">
            {{ t('aboutUs.title') }}
          </h2>
          <p class="text-base text-neutral-600 leading-relaxed mb-6">
            {{ t('aboutUs.description') }}
          </p>
          <div class="grid grid-cols-2 gap-6 mb-8">
            <div v-for="stat in stats" :key="stat.label" class="flex flex-col">
              <span class="text-2xl md:text-3xl font-bold text-[#384d37]">{{ stat.value }}</span>
              <span class="text-sm text-neutral-500 mt-1">{{ stat.label }}</span>
            </div>
          </div>
          <NuxtLink
            :to="localePath('/contact')"
            class="inline-flex items-center gap-2 px-6 py-3 bg-[#384d37] text-white text-sm font-semibold rounded-lg hover:bg-[#2c3e2b] transition-colors duration-200"
          >
            {{ t('aboutUs.cta') }}
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="order-1 lg:order-2">
          <div class="relative">
            <div class="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                :alt="t('aboutUs.title')"
                class="w-full h-full object-cover"
                loading="lazy"
              >
            </div>
            <div class="absolute -bottom-4 -left-4 w-24 h-24 bg-[#384d37]/10 rounded-2xl -z-10" />
            <div class="absolute -top-4 -right-4 w-32 h-32 bg-[#384d37]/5 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const { t } = useI18n();

const stats = computed(() => [
  { value: '10+', label: t('aboutUs.statYears') },
  { value: '5000+', label: t('aboutUs.statProducts') },
  { value: '15K+', label: t('aboutUs.statCustomers') },
  { value: '99%', label: t('aboutUs.statSatisfaction') },
]);
</script>

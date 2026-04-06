<template>
  <NuxtLayout name="default">
    <div class="bg-white">
      <!-- Hero: Sol metin + Sağ görsel -->
      <div class="bg-gradient-to-br from-[#f7faf7] via-white to-[#f0f5ef] -mt-[20px]">
        <div class="max-w-[1536px] mx-auto px-6 lg:px-8 py-14 md:py-20">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <!-- Sol: Metin -->
            <div>
              <div class="mb-3">
                <img
                  src="/_nuxt-plenty/images/horecax-logo.png"
                  alt="HorecaX"
                  class="h-14 md:h-20 w-auto object-contain mix-blend-multiply"
                />
              </div>

              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
                {{ t('campaigns.heroTitle') }}
              </h1>

              <p class="mt-5 text-base md:text-lg text-neutral-600 leading-relaxed max-w-lg">
                {{ t('campaigns.heroDesc') }}
              </p>

              <p class="mt-3 text-base text-[#384d37] font-semibold">
                {{ t('campaigns.heroCtaText') }}
              </p>

              <!-- So funktioniert es -->
              <div class="mt-10 p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
                <h3 class="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
                  {{ t('campaigns.howTitle') }}
                </h3>
                <p class="text-sm text-neutral-600 leading-relaxed">
                  {{ t('campaigns.howDesc') }}
                </p>
              </div>

              <!-- 3 adım -->
              <div class="mt-8 flex flex-col sm:flex-row items-stretch gap-3">
                <div class="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div class="w-10 h-10 rounded-lg bg-[#384d37] flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
                  </div>
                  <div>
                    <p class="text-sm font-bold text-neutral-900">{{ t('campaigns.step1Title') }}</p>
                    <p class="text-[11px] text-neutral-500 leading-tight">{{ t('campaigns.step1Desc') }}</p>
                  </div>
                </div>
                <div class="hidden sm:flex items-center text-neutral-300">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                </div>
                <div class="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div class="w-10 h-10 rounded-lg bg-[#384d37] flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                  </div>
                  <div>
                    <p class="text-sm font-bold text-neutral-900">{{ t('campaigns.step2Title') }}</p>
                    <p class="text-[11px] text-neutral-500 leading-tight">{{ t('campaigns.step2Desc') }}</p>
                  </div>
                </div>
                <div class="hidden sm:flex items-center text-neutral-300">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                </div>
                <div class="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div class="w-10 h-10 rounded-lg bg-[#384d37] flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>
                  </div>
                  <div>
                    <p class="text-sm font-bold text-neutral-900">{{ t('campaigns.step3Title') }}</p>
                    <p class="text-[11px] text-neutral-500 leading-tight">{{ t('campaigns.step3Desc') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sağ: Görsel -->
            <div class="relative hidden lg:flex items-center justify-center">
              <img
                src="/_nuxt-plenty/images/campaign-hero.png"
                alt="Bonusprogramm"
                class="w-full max-w-[600px] h-auto object-contain mix-blend-multiply"
                loading="lazy"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Ürünler -->
      <div class="max-w-[1536px] mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-neutral-900">{{ t('campaigns.productsTitle') }}</h2>
            <p class="mt-1 text-sm text-neutral-500">{{ products.length }} {{ t('campaigns.productsCount') }}</p>
          </div>
          <div class="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-100">
            <div class="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            </div>
            <div>
              <p class="text-[10px] font-medium text-red-400 uppercase tracking-wider">{{ t('campaigns.endsIn') }}</p>
              <div class="flex items-center gap-1.5 mt-0.5">
                <div class="text-center">
                  <span class="text-lg font-black text-red-600 tabular-nums leading-none">{{ countdown.days }}</span>
                  <span class="text-[9px] text-red-400 font-medium ml-0.5">{{ t('campaigns.d') }}</span>
                </div>
                <span class="text-red-300 font-bold text-sm">:</span>
                <div class="text-center">
                  <span class="text-lg font-black text-red-600 tabular-nums leading-none">{{ String(countdown.hours).padStart(2, '0') }}</span>
                  <span class="text-[9px] text-red-400 font-medium ml-0.5">h</span>
                </div>
                <span class="text-red-300 font-bold text-sm">:</span>
                <div class="text-center">
                  <span class="text-lg font-black text-red-600 tabular-nums leading-none">{{ String(countdown.minutes).padStart(2, '0') }}</span>
                  <span class="text-[9px] text-red-400 font-medium ml-0.5">m</span>
                </div>
                <span class="text-red-300 font-bold text-sm">:</span>
                <div class="text-center">
                  <span class="text-lg font-black text-red-600 tabular-nums leading-none">{{ String(countdown.seconds).padStart(2, '0') }}</span>
                  <span class="text-[9px] text-red-400 font-medium ml-0.5">s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          <div v-for="i in 20" :key="i" class="bg-neutral-50 rounded-lg border border-neutral-100 animate-pulse">
            <div class="aspect-square bg-neutral-100 rounded-t-lg" />
            <div class="p-4 space-y-3">
              <div class="h-3 bg-neutral-100 rounded w-3/4" />
              <div class="h-3 bg-neutral-100 rounded w-1/2" />
              <div class="h-5 bg-neutral-100 rounded w-1/3" />
            </div>
          </div>
        </div>

        <div v-else-if="products.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          <div
            v-for="product in products"
            :key="productGetters.getVariationId(product)"
            class="group relative bg-white rounded-xl border border-neutral-200 overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-neutral-300 flex flex-col"
          >
            <!-- Kampanya badge -->
            <div class="absolute top-3 left-3 z-10">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#384d37] text-white text-[10px] font-bold uppercase tracking-wide shadow-md">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>
                {{ t('campaigns.cardBadge') }}
              </span>
            </div>

            <!-- Ürün görseli -->
            <NuxtLink :to="getProductUrl(product)" class="block relative aspect-square overflow-hidden bg-white">
              <NuxtImg
                v-if="productGetters.getCoverImage(product)"
                :src="productGetters.getCoverImage(product)"
                :alt="productGetters.getName(product)"
                class="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                width="400"
                height="400"
              />
            </NuxtLink>

            <!-- Ürün bilgileri -->
            <div class="p-4 flex flex-col flex-1 border-t border-neutral-100">
              <NuxtLink :to="getProductUrl(product)" class="block min-h-[2.5rem]">
                <h3 class="text-sm font-medium text-neutral-800 line-clamp-2 leading-snug group-hover:text-[#384d37] transition-colors">
                  {{ productGetters.getName(product) }}
                </h3>
              </NuxtLink>

              <div class="mt-auto pt-2 flex items-center justify-between gap-2">
                <template v-if="isAuthorized">
                  <span class="text-lg font-bold text-neutral-900">{{ formatPrice(productGetters.getPrice(product)) }}</span>
                </template>
                <NuxtLink v-else :to="localePath(paths.authLogin)" class="inline-flex items-center gap-1.5 text-xs font-medium text-[#384d37] hover:text-[#2c3e2b] transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                  {{ t('product.loginToSeePrice') }}
                </NuxtLink>
                <div class="flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 border border-red-100">
                  <svg class="w-3 h-3 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  <span class="text-[10px] font-bold text-red-600 tabular-nums whitespace-nowrap">{{ countdown.days }}{{ t('campaigns.d') }} {{ String(countdown.hours).padStart(2, '0') }}:{{ String(countdown.minutes).padStart(2, '0') }}:{{ String(countdown.seconds).padStart(2, '0') }}</span>
                </div>
              </div>

              <!-- Ürünü İncele butonu -->
              <NuxtLink
                :to="getProductUrl(product)"
                class="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-200 text-neutral-700 text-sm font-medium transition-colors duration-200 hover:bg-neutral-50 hover:border-neutral-300"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                {{ t('campaigns.viewProduct') }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-20">
          <svg class="w-16 h-16 text-neutral-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>
          <p class="text-neutral-400 text-lg">{{ t('campaigns.noProducts') }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Locale } from '#i18n';
import { productGetters } from '@plentymarkets/shop-api';
import type { Product } from '@plentymarkets/shop-api';
import { stripLocalePrefix } from '~/utils/pathHelper';
import { paths } from '~/utils/paths';

defineI18nRoute({
  locales: process.env.LANGUAGELIST?.split(',') as Locale[],
});
definePageMeta({
  layout: false,
  pageType: 'static',
});

const { t, n } = useI18n();
const localePath = useLocalePath();
const { isAuthorized } = useCustomer();

const loading = ref(true);
const products = ref<Product[]>([]);

const getProductUrl = (product: Product): string => {
  const urlPath = productGetters.getUrlPath(product);
  const itemId = productGetters.getItemId(product);
  const variationId = productGetters.getVariationId(product);
  const cleanPath = stripLocalePrefix(`/${urlPath}`);
  const basePath = `${cleanPath}_${itemId}`;
  const shouldAppend = productGetters.shouldAppendVariationToLink(product);
  return localePath(shouldAppend ? `${basePath}_${variationId}` : basePath);
};

const formatPrice = (price: number | null): string => {
  return n(price ?? 0, 'currency');
};

const CAMPAIGN_DAYS = 15;
const campaignEnd = new Date();
campaignEnd.setDate(campaignEnd.getDate() + CAMPAIGN_DAYS);

const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });

const updateCountdown = () => {
  const now = new Date().getTime();
  const diff = campaignEnd.getTime() - now;
  if (diff <= 0) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return;
  }
  countdown.value = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
};

updateCountdown();

let countdownInterval: ReturnType<typeof setInterval>;

onMounted(async () => {
  countdownInterval = setInterval(updateCountdown, 1000);

  try {
    const data = await useSdk().plentysystems.getFacet({
      type: 'all',
      itemsPerPage: 20,
      sort: 'default.recommended_sorting',
    });
    products.value = (data?.data?.products as Product[]) || [];
  } catch {
    products.value = [];
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval);
});
</script>

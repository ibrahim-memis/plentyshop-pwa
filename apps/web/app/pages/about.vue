<template>
  <NuxtLayout name="default">
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8 pb-[15px]">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 py-4 text-sm text-neutral-400">
        <NuxtLink :to="localePath(paths.home)" class="hover:text-neutral-700 transition-colors">
          {{ t('aboutUs.breadcrumbHome') }}
        </NuxtLink>
        <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        <span class="text-neutral-800 font-medium">{{ t('aboutUs.label') }}</span>
      </nav>

      <!-- Page header -->
      <div class="pb-8 border-b border-neutral-100">
        <h1 class="text-2xl md:text-3xl font-bold text-neutral-900">{{ t('aboutUs.label') }}</h1>
        <p class="mt-2 text-neutral-500 text-sm md:text-base max-w-2xl">{{ t('aboutUs.description') }}</p>
      </div>

      <!-- Hero section -->
      <div class="py-8 md:py-12">
        <div class="rounded-2xl bg-gradient-to-br from-[#384d37] to-[#2c3e2b] p-8 md:p-12 lg:p-16 relative overflow-hidden">
          <div class="absolute inset-0 opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;1&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');" />
          <div class="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span class="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold uppercase tracking-widest rounded-full border border-white/10 mb-5">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>
                HafenX GmbH
              </span>
              <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">{{ t('aboutUs.heroTitle') }}</h2>
              <p class="mt-4 text-white/70 text-sm md:text-base leading-relaxed max-w-lg">{{ t('aboutUs.heroDesc') }}</p>
              <NuxtLink
                :to="localePath(paths.contact)"
                class="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#384d37] text-sm font-semibold hover:bg-neutral-100 transition-colors"
              >
                {{ t('aboutUs.cta') }}
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </NuxtLink>
            </div>
            <!-- Stats grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white/[0.08] backdrop-blur-sm rounded-xl border border-white/10 p-5 text-center">
                <div class="text-3xl md:text-4xl font-bold text-white">10+</div>
                <div class="text-xs text-white/50 mt-1 uppercase tracking-wider">{{ t('aboutUs.statYears') }}</div>
              </div>
              <div class="bg-white/[0.08] backdrop-blur-sm rounded-xl border border-white/10 p-5 text-center">
                <div class="text-3xl md:text-4xl font-bold text-white">5.000+</div>
                <div class="text-xs text-white/50 mt-1 uppercase tracking-wider">{{ t('aboutUs.statProducts') }}</div>
              </div>
              <div class="bg-white/[0.08] backdrop-blur-sm rounded-xl border border-white/10 p-5 text-center">
                <div class="text-3xl md:text-4xl font-bold text-white">500+</div>
                <div class="text-xs text-white/50 mt-1 uppercase tracking-wider">{{ t('aboutUs.statCustomers') }}</div>
              </div>
              <div class="bg-white/[0.08] backdrop-blur-sm rounded-xl border border-white/10 p-5 text-center">
                <div class="text-3xl md:text-4xl font-bold text-white">99%</div>
                <div class="text-xs text-white/50 mt-1 uppercase tracking-wider">{{ t('aboutUs.statSatisfaction') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Values section -->
      <div class="py-8 md:py-12 border-t border-neutral-100">
        <div class="text-center mb-10">
          <h2 class="text-xl md:text-2xl font-bold text-neutral-900">{{ t('aboutUs.valuesTitle') }}</h2>
          <p class="mt-2 text-sm text-neutral-500 max-w-xl mx-auto">{{ t('aboutUs.valuesDesc') }}</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="rounded-xl border border-neutral-200 p-6 hover:border-[#384d37]/30 hover:shadow-sm transition-all">
            <div class="w-12 h-12 rounded-xl bg-[#384d37]/10 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">{{ t('aboutUs.value1Title') }}</h3>
            <p class="text-sm text-neutral-500 leading-relaxed">{{ t('aboutUs.value1Desc') }}</p>
          </div>
          <div class="rounded-xl border border-neutral-200 p-6 hover:border-[#384d37]/30 hover:shadow-sm transition-all">
            <div class="w-12 h-12 rounded-xl bg-[#384d37]/10 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">{{ t('aboutUs.value2Title') }}</h3>
            <p class="text-sm text-neutral-500 leading-relaxed">{{ t('aboutUs.value2Desc') }}</p>
          </div>
          <div class="rounded-xl border border-neutral-200 p-6 hover:border-[#384d37]/30 hover:shadow-sm transition-all">
            <div class="w-12 h-12 rounded-xl bg-[#384d37]/10 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mb-2">{{ t('aboutUs.value3Title') }}</h3>
            <p class="text-sm text-neutral-500 leading-relaxed">{{ t('aboutUs.value3Desc') }}</p>
          </div>
        </div>
      </div>

      <!-- Why HafenX section -->
      <div class="py-8 md:py-12 border-t border-neutral-100">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-neutral-900">{{ t('aboutUs.whyTitle') }}</h2>
            <p class="mt-3 text-sm text-neutral-500 leading-relaxed">{{ t('aboutUs.whyDesc') }}</p>
            <ul class="mt-6 space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-[#384d37]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3.5 h-3.5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                </div>
                <div>
                  <p class="text-sm font-semibold text-neutral-900">{{ t('aboutUs.reason1Title') }}</p>
                  <p class="text-xs text-neutral-500 mt-0.5">{{ t('aboutUs.reason1Desc') }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-[#384d37]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3.5 h-3.5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                </div>
                <div>
                  <p class="text-sm font-semibold text-neutral-900">{{ t('aboutUs.reason2Title') }}</p>
                  <p class="text-xs text-neutral-500 mt-0.5">{{ t('aboutUs.reason2Desc') }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-[#384d37]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3.5 h-3.5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                </div>
                <div>
                  <p class="text-sm font-semibold text-neutral-900">{{ t('aboutUs.reason3Title') }}</p>
                  <p class="text-xs text-neutral-500 mt-0.5">{{ t('aboutUs.reason3Desc') }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-[#384d37]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3.5 h-3.5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                </div>
                <div>
                  <p class="text-sm font-semibold text-neutral-900">{{ t('aboutUs.reason4Title') }}</p>
                  <p class="text-xs text-neutral-500 mt-0.5">{{ t('aboutUs.reason4Desc') }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Contact CTA card -->
          <div class="rounded-xl border border-neutral-200 overflow-hidden">
            <div class="p-6 md:p-8 bg-neutral-50">
              <h3 class="text-lg font-bold text-neutral-900">{{ t('aboutUs.ctaCardTitle') }}</h3>
              <p class="text-sm text-neutral-500 mt-2 leading-relaxed">{{ t('aboutUs.ctaCardDesc') }}</p>
            </div>
            <div class="p-6 md:p-8 space-y-4 border-t border-neutral-100">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-[#384d37]/10 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                </div>
                <div>
                  <p class="text-xs text-neutral-400 uppercase tracking-wider font-medium">{{ t('aboutUs.ctaPhone') }}</p>
                  <a href="tel:+4971594591920" class="text-sm font-semibold text-neutral-900 hover:text-[#384d37] transition-colors">+49 7159 4591920</a>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-[#384d37]/10 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                </div>
                <div>
                  <p class="text-xs text-neutral-400 uppercase tracking-wider font-medium">{{ t('aboutUs.ctaEmail') }}</p>
                  <a href="mailto:sales@hafenx.com" class="text-sm font-semibold text-neutral-900 hover:text-[#384d37] transition-colors">sales@hafenx.com</a>
                </div>
              </div>
              <NuxtLink
                :to="localePath(paths.contact)"
                class="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#384d37] text-white text-sm font-semibold hover:bg-[#2c3e2b] transition-colors"
              >
                {{ t('aboutUs.cta') }}
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Locale } from '#i18n';
import { paths } from '~/utils/paths';

defineI18nRoute({
  locales: process.env.LANGUAGELIST?.split(',') as Locale[],
});
definePageMeta({
  layout: false,
  pageType: 'static',
});

const localePath = useLocalePath();
const { getRobots, setRobotForStaticPage } = useRobots();
const { setPageMeta } = usePageMeta();

setPageMeta(t('aboutUs.label'), 'page');

await getRobots();
setRobotForStaticPage('AboutPage');
</script>

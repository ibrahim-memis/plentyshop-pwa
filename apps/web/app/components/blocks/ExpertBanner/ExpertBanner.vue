<template>
  <div data-testid="expert-banner-block" class="bg-white">
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8 py-6">
      <div class="bg-gradient-to-r from-[#384d37]/[0.04] via-white to-[#384d37]/[0.06] border border-[#384d37]/10 rounded-2xl overflow-hidden">
        <div class="flex flex-col md:flex-row items-stretch min-h-[220px]">
          <!-- Sol: Danışman Görseli -->
          <div class="shrink-0 hidden md:block w-48 lg:w-60 relative overflow-hidden">
            <img
              src="/_nuxt-plenty/images/expert-consultant.png"
              alt="HorecaX Berater"
              class="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
          </div>

          <!-- Orta: Metin -->
          <div class="flex-1 px-6 md:px-10 py-6 md:py-7">
            <h3 class="text-base md:text-lg font-extrabold text-[#384d37] uppercase tracking-wide mb-2">
              {{ t('expertBanner.title') }}
            </h3>
            <p class="text-sm text-neutral-600 leading-relaxed mb-4 max-w-2xl">
              {{ t('expertBanner.description') }}
            </p>
            <ul class="space-y-1.5">
              <li class="flex items-center gap-2 text-sm text-neutral-700">
                <span class="w-1.5 h-1.5 rounded-full bg-[#384d37] shrink-0" />
                {{ t('expertBanner.point1') }}
              </li>
              <li class="flex items-center gap-2 text-sm text-neutral-700">
                <span class="w-1.5 h-1.5 rounded-full bg-[#384d37] shrink-0" />
                {{ t('expertBanner.point2') }}
              </li>
              <li class="flex items-center gap-2 text-sm text-neutral-700">
                <span class="w-1.5 h-1.5 rounded-full bg-[#384d37] shrink-0" />
                {{ t('expertBanner.point3') }}
              </li>
            </ul>
          </div>

          <!-- Sağ: İletişim -->
          <div class="shrink-0 flex flex-col justify-center gap-5 px-8 md:px-10 lg:px-14 py-6 md:py-7 border-t md:border-t-0 md:border-l border-[#384d37]/10 w-full md:w-auto md:min-w-[300px] lg:min-w-[340px]">
            <!-- Telefon -->
            <a href="tel:+4971594591920" class="flex items-center gap-4 group">
              <div class="w-12 h-12 rounded-full bg-[#384d37] flex items-center justify-center shrink-0 group-hover:bg-[#2c3e2b] transition-colors shadow-md shadow-[#384d37]/20">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
              </div>
              <div>
                <span class="text-lg font-bold text-[#384d37] group-hover:text-[#2c3e2b] transition-colors whitespace-nowrap">
                  +49 7159 4591920
                </span>
                <p class="text-xs text-neutral-500 mt-0.5">Di – Fr, 10:00 – 15:00 Uhr</p>
              </div>
            </a>

            <div class="w-full h-px bg-[#384d37]/10" />

            <!-- Online Görüşme -->
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span class="text-xs font-semibold text-[#384d37]/70 uppercase tracking-wider">
                  {{ t('expertBanner.onlineLabel') }}
                </span>
              </div>
              <NuxtLink
                :to="localePath('/contact')"
                class="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#384d37] text-white text-sm font-bold rounded-xl hover:bg-[#2c3e2b] transition-all hover:shadow-lg hover:shadow-[#384d37]/20"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                {{ t('expertBanner.scheduleMeeting') }}
              </NuxtLink>
              <p class="text-[11px] text-neutral-400 text-center">
                {{ t('expertBanner.meetingHint') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>

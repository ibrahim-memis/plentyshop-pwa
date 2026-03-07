<template>
  <div data-testid="testimonials-block">
  <div class="bg-white relative overflow-hidden">
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8 py-16 md:py-20 relative z-10">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
        <div>
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#384d37]/10 text-[#384d37] text-xs font-semibold uppercase tracking-wider mb-4">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
            {{ t('testimonials.badge') }}
          </span>
          <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
            {{ t('testimonials.title') }}
          </h2>
          <p class="mt-2 text-sm md:text-base text-neutral-500 max-w-lg">
            {{ t('testimonials.subtitle') }}
          </p>
        </div>

        <div class="flex items-center gap-6 shrink-0">
          <div class="text-center">
            <p class="text-3xl md:text-4xl font-black text-[#384d37]">500+</p>
            <p class="text-xs text-neutral-400 font-medium mt-0.5">{{ t('testimonials.statClients') }}</p>
          </div>
          <div class="w-px h-10 bg-neutral-200" />
          <div class="text-center">
            <p class="text-3xl md:text-4xl font-black text-[#384d37]">4.9</p>
            <p class="text-xs text-neutral-400 font-medium mt-0.5">{{ t('testimonials.statRating') }}</p>
          </div>
          <div class="w-px h-10 bg-neutral-200" />
          <div class="text-center">
            <p class="text-3xl md:text-4xl font-black text-[#384d37]">98%</p>
            <p class="text-xs text-neutral-400 font-medium mt-0.5">{{ t('testimonials.statSatisfaction') }}</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          v-for="(review, idx) in testimonials"
          :key="idx"
          class="bg-neutral-50 rounded-xl p-6 md:p-7 border border-neutral-100 hover:border-neutral-200 hover:shadow-md transition-all duration-300 group"
        >
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-1">
              <svg
                v-for="star in 5"
                :key="star"
                class="w-4 h-4"
                :class="star <= review.rating ? 'text-amber-400' : 'text-neutral-200'"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <svg class="w-8 h-8 text-[#384d37]/10 group-hover:text-[#384d37]/20 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
          </div>

          <p class="text-sm md:text-[15px] text-neutral-600 leading-relaxed mb-6">
            {{ review.text }}
          </p>

          <div class="flex items-center gap-3 pt-5 border-t border-neutral-100">
            <div class="w-10 h-10 rounded-full bg-[#384d37] flex items-center justify-center shrink-0">
              <span class="text-xs font-bold text-white">{{ review.initials }}</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-neutral-900">{{ review.name }}</p>
              <p class="text-xs text-neutral-400">{{ review.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Ayırıcı şerit: Testimonials ile Footer arasında -->
  <div class="bg-[#384d37]">
    <div class="max-w-[1536px] mx-auto px-6 lg:px-8 py-6 md:py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-5">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <svg class="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
            </div>
            <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <svg class="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.747L21.066 3.403A2.25 2.25 0 0 0 19.208 2.5H15M2.25 14.25V5.625c0-.621.504-1.125 1.125-1.125h7.5" /></svg>
            </div>
            <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <svg class="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
            </div>
          </div>
          <div>
            <p class="text-sm font-bold text-white">{{ t('testimonials.ctaTitle') }}</p>
            <p class="text-xs text-white/50">{{ t('testimonials.ctaSubtitle') }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-bold text-white">+49 7159 4591920</span>
          <span class="text-white/30">|</span>
          <span class="text-sm text-white/60">sales{'@'}hafenx.com</span>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const testimonials = computed(() => [
  {
    name: t('testimonials.review1Name'),
    initials: t('testimonials.review1Initials'),
    role: t('testimonials.review1Role'),
    text: t('testimonials.review1Text'),
    rating: 5,
  },
  {
    name: t('testimonials.review2Name'),
    initials: t('testimonials.review2Initials'),
    role: t('testimonials.review2Role'),
    text: t('testimonials.review2Text'),
    rating: 5,
  },
  {
    name: t('testimonials.review3Name'),
    initials: t('testimonials.review3Initials'),
    role: t('testimonials.review3Role'),
    text: t('testimonials.review3Text'),
    rating: 4,
  },
]);
</script>

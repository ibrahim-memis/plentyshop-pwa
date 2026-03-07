<template>
  <div data-testid="membership-banner-block">
    <div class="relative overflow-hidden bg-[#384d37] py-12 md:py-16">
      <!-- Dekoratif arka plan deseni -->
      <div class="absolute inset-0 opacity-[0.04]">
        <div class="absolute -top-20 -left-20 w-80 h-80 rounded-full border border-white" />
        <div class="absolute -bottom-16 -right-16 w-64 h-64 rounded-full border border-white" />
        <div class="absolute top-1/2 left-1/3 w-40 h-40 rounded-full border border-white" />
      </div>

      <div class="max-w-[1536px] mx-auto px-6 relative z-10 text-center">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
          {{ content?.text?.title || t('membershipBanner.title') }}
        </h2>
        <p class="text-sm md:text-base text-white/60 max-w-xl mx-auto mb-6">
          {{ content?.text?.subtitle || t('membershipBanner.subtitle') }}
        </p>
        <NuxtLink
          v-if="content?.button?.link || defaultLink"
          :to="localePath(content?.button?.link || defaultLink)"
          class="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#384d37] font-bold text-sm rounded-md hover:bg-neutral-100 transition-colors uppercase tracking-wider"
        >
          {{ content?.button?.label || t('membershipBanner.cta') }}
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MembershipBannerProps {
  content?: {
    text?: {
      title?: string;
      subtitle?: string;
    };
    button?: {
      label?: string;
      link?: string;
    };
  };
  meta?: { uuid: string };
}

const { content } = defineProps<MembershipBannerProps>();
const localePath = useLocalePath();
const { t } = useI18n();
const defaultLink = '/register';
</script>

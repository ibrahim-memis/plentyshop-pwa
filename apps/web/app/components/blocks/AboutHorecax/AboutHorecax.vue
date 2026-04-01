<template>
  <div data-testid="about-horecax-block" class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-[#384d37] via-[#2c3e2b] to-[#1e2d1d]" />
    <div class="absolute inset-0 opacity-[0.04]" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;80&quot; height=&quot;80&quot; viewBox=&quot;0 0 80 80&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.3&quot;%3E%3Cpath d=&quot;M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" />

    <div class="relative max-w-[1536px] mx-auto px-6 lg:px-8 py-16 md:py-24">
      <div class="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-bold uppercase tracking-widest rounded-full mb-6 border border-white/15">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
            </svg>
            {{ t('aboutHorecax.badge') }}
          </span>

          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            {{ t('aboutHorecax.title') }}
          </h2>

          <p class="text-base md:text-lg text-white/75 leading-relaxed mb-8 max-w-lg">
            {{ t('aboutHorecax.description') }}
          </p>

          <div class="flex flex-wrap gap-3 mb-10">
            <span
              v-for="(tag, idx) in tags"
              :key="idx"
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 border border-white/15 rounded-full text-xs font-semibold text-white/80"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-white/50" />
              {{ tag }}
            </span>
          </div>

          <NuxtLink
            :to="localePath('/about')"
            class="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#384d37] text-sm font-bold rounded-xl hover:bg-white/95 hover:shadow-xl transition-all duration-200 shadow-lg group"
          >
            {{ t('aboutHorecax.cta') }}
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </NuxtLink>
        </div>

        <div class="space-y-5">
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="(stat, idx) in stats"
              :key="idx"
              class="relative p-5 md:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300"
            >
              <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" :class="stat.iconBg">
                <div class="w-5 h-5 text-white" v-html="stat.icon" />
              </div>
              <div class="text-2xl md:text-3xl font-black text-white mb-1">{{ stat.value }}</div>
              <div class="text-xs font-semibold text-white/70">{{ stat.label }}</div>
            </div>
          </div>

          <div class="p-5 md:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-bold text-white mb-1">{{ t('aboutHorecax.mission.title') }}</h4>
                <p class="text-xs text-white/60 leading-relaxed">{{ t('aboutHorecax.mission.desc') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface AboutHorecaxProps {
  content?: Record<string, unknown>;
  meta?: { uuid: string };
  index?: number;
}

defineProps<AboutHorecaxProps>();
const { t } = useI18n();
const localePath = useLocalePath();

const tags = computed(() => [
  t('aboutHorecax.tags.gastronomy'),
  t('aboutHorecax.tags.hotel'),
  t('aboutHorecax.tags.catering'),
  t('aboutHorecax.tags.wholesale'),
]);

const stats = computed(() => [
  {
    value: '5.000+',
    label: t('aboutHorecax.stats.products'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>',
    iconBg: 'bg-white/10',
  },
  {
    value: '500+',
    label: t('aboutHorecax.stats.customers'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>',
    iconBg: 'bg-white/10',
  },
  {
    value: '24h',
    label: t('aboutHorecax.stats.shipping'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.136-.504 1.125-1.125a17.902 17.902 0 0 0-3.213-9.174L21 2.118a.75.75 0 0 0-.527-.912 60.11 60.11 0 0 0-16.536 0A.75.75 0 0 0 3.41 2.118L2.963 4.95a17.902 17.902 0 0 0-3.213 9.175c-.011.621.504 1.125 1.125 1.125H2.25m17.25 0h-7.5" /></svg>',
    iconBg: 'bg-white/10',
  },
  {
    value: 'DACH',
    label: t('aboutHorecax.stats.region'),
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>',
    iconBg: 'bg-white/10',
  },
]);
</script>

<template>
  <!-- Sağ alt köşe: Danışman butonu -->
  <button
    v-show="!isOpen"
    type="button"
    class="fixed right-5 bottom-20 z-[990] w-[60px] h-[60px] rounded-full shadow-xl shadow-[#384d37]/25 hover:shadow-2xl hover:shadow-[#384d37]/40 hover:scale-110 transition-all duration-300 cursor-pointer"
    @click="isOpen = true"
  >
    <div class="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white">
      <img
        src="/_nuxt-plenty/images/expert-consultant.png"
        alt="Berater"
        class="w-full h-full object-cover object-top"
      />
    </div>
    <div class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full ring-[2.5px] ring-white" />
  </button>

  <!-- Overlay -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/25 backdrop-blur-sm z-[9998]"
      @click="isOpen = false"
    />
  </Transition>

  <!-- Panel -->
  <Transition name="slide">
    <div
      v-if="isOpen"
      class="fixed right-0 top-0 h-full w-[420px] max-w-[92vw] bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.15)] z-[9999] flex flex-col"
    >
      <!-- Header -->
      <div class="relative bg-[#384d37] px-6 pt-7 pb-14 text-white overflow-hidden shrink-0">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.04%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <button
          type="button"
          class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          @click="isOpen = false"
        >
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        </button>
        <div class="relative">
          <div class="flex items-center gap-2 mb-1">
            <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span class="text-[11px] font-medium text-emerald-300 uppercase tracking-wider">{{ t('consultant.online') }}</span>
          </div>
          <h3 class="text-lg font-bold">{{ t('consultant.title') }}</h3>
          <p class="text-sm text-white/70 mt-1">{{ t('consultant.subtitle') }}</p>
        </div>
      </div>

      <!-- Danışman Kartı -->
      <div class="px-6 -mt-8 relative z-10 shrink-0">
        <div class="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-4 border border-neutral-100">
          <div class="w-14 h-14 rounded-xl overflow-hidden shrink-0 ring-2 ring-[#384d37]/10">
            <img
              src="/_nuxt-plenty/images/expert-consultant.png"
              alt="Berater"
              class="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <p class="font-bold text-neutral-900 text-sm">{{ t('consultant.name') }}</p>
            <p class="text-xs text-neutral-500">{{ t('consultant.role') }}</p>
            <div class="flex items-center gap-1 mt-1.5">
              <div v-for="i in 5" :key="i" class="w-3 h-3 text-amber-400">
                <svg viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
              <span class="text-[10px] text-neutral-400 ml-0.5">{{ t('consultant.rating') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- İletişim Seçenekleri -->
      <div class="flex-1 px-6 pt-5 pb-4 space-y-3 overflow-y-auto min-h-0">
        <!-- Telefon -->
        <a
          href="tel:+4971594591920"
          class="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 hover:border-[#384d37]/20 hover:bg-[#384d37]/[0.03] transition-all group"
        >
          <div class="w-12 h-12 rounded-xl bg-[#384d37] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md shadow-[#384d37]/20">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-neutral-900">{{ t('consultant.callTitle') }}</p>
            <p class="text-base font-bold text-[#384d37]">+49 7159 4591920</p>
            <p class="text-[11px] text-neutral-400">Di – Fr, 10:00 – 15:00 Uhr</p>
          </div>
        </a>

        <!-- Online Görüşme -->
        <a
          href="https://calendar.notion.so/meet/ahmetsaribas/hafenxdigital"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 hover:border-[#384d37]/20 hover:bg-[#384d37]/[0.03] transition-all group"
        >
          <div class="w-12 h-12 rounded-xl bg-[#384d37]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <svg class="w-5 h-5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-neutral-900">{{ t('consultant.meetingTitle') }}</p>
            <p class="text-xs text-neutral-500">{{ t('consultant.meetingDesc') }}</p>
          </div>
          <svg class="w-4 h-4 text-neutral-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        </a>

        <!-- WhatsApp -->
        <a
          href="https://wa.me/4971594591920"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group"
        >
          <div class="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md shadow-emerald-500/20">
            <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-neutral-900">WhatsApp</p>
            <p class="text-xs text-neutral-500">{{ t('consultant.whatsappDesc') }}</p>
          </div>
          <svg class="w-4 h-4 text-neutral-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        </a>

        <!-- E-Posta -->
        <a
          href="mailto:info@horecax.com"
          class="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 hover:border-[#384d37]/20 hover:bg-[#384d37]/[0.03] transition-all group"
        >
          <div class="w-12 h-12 rounded-xl bg-[#384d37]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <svg class="w-5 h-5 text-[#384d37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-neutral-900">E-Mail</p>
            <p class="text-xs text-[#384d37]">info@horecax.com</p>
          </div>
          <svg class="w-4 h-4 text-neutral-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        </a>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 shrink-0">
        <p class="text-[11px] text-neutral-400 text-center">
          {{ t('consultant.footer') }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const isOpen = ref(false);
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

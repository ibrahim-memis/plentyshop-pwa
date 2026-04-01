<template>
  <div class="flex items-center">
    <picture v-if="hasCustomLogo && !logoError">
      <template v-if="imageExtension === 'svg'">
        <NuxtImg
          ref="logo"
          :src="headerLogo"
          :alt="`${storeName} logo`"
          class="h-8 md:h-10 w-auto object-contain"
          width="180"
          height="40"
          preload
          @error="logoError = true"
        />
      </template>
      <template v-else>
        <img
          id="logo"
          ref="logo"
          :src="headerLogo"
          :alt="`${storeName} logo`"
          class="h-8 md:h-10 w-auto object-contain max-w-[180px]"
          preload
          @error="logoError = true"
        />
      </template>
    </picture>
    <span v-else class="text-xl md:text-2xl font-normal tracking-wide text-neutral-800" style="font-family: 'Urbanist', sans-serif;">
      {{ storeName }}
    </span>
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { getSetting: getHeaderLogo } = useSiteSettings('headerLogo');

const headerLogo = computed(() => getHeaderLogo());

const storeName = runtimeConfig.public.storename || 'HafenX';
const logoError = ref(false);

const isDefaultLogo = computed(() => {
  return !headerLogo.value || headerLogo.value.includes('plentymarkets.com');
});
const hasCustomLogo = computed(() => !isDefaultLogo.value);

const imageExtension = computed(() => headerLogo.value.split('.').pop());
const logo = ref<HTMLImageElement | null>(null);

watch(headerLogo, () => {
  logoError.value = false;
});
</script>

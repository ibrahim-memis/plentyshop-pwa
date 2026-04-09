<template>
  <template v-if="basePrice">
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 mb-[15px] px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
      <div class="flex items-center gap-1.5 shrink-0">
        <svg class="w-3.5 h-3.5 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /></svg>
        <span class="text-xs text-neutral-500 whitespace-nowrap">{{ t('common.labels.content') }}:</span>
        <span class="text-xs font-semibold text-neutral-700 whitespace-nowrap">{{ unitContent }} {{ unitName }}</span>
      </div>
      <div class="hidden md:block w-px h-4 bg-neutral-200" />
      <div class="flex items-center gap-1.5 shrink-0">
        <span class="text-xs text-neutral-500 whitespace-nowrap">{{ t('common.labels.basePrice') }}:</span>
        <span class="text-xs font-semibold text-[#384d37] whitespace-nowrap">{{ basePrice }}</span>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { BasePriceProps } from '~/components/BasePrice/types';

defineProps<BasePriceProps>();
</script>

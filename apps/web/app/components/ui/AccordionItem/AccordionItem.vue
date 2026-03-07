<template>
  <SfAccordionItem v-model="internalModelValue" :summary-class="finalSummaryClass" data-testid="accordion-item">
    <template #summary>
      <slot name="summary">
        <p>{{ summary }}</p>
      </slot>
      <!-- HomeDeluxe: +/- ikonu -->
      <span class="text-neutral-500 text-xl font-light leading-none select-none w-6 h-6 flex items-center justify-center transition-transform duration-200">
        {{ internalModelValue ? '−' : '+' }}
      </span>
    </template>
    <div class="py-3 px-0"><slot /></div>
  </SfAccordionItem>
</template>

<script setup lang="ts">
import { SfAccordionItem } from '@storefront-ui/vue';
import { useVModel } from '@vueuse/core';
import type { AccordionItemProps } from '~/components/ui/AccordionItem/types';

const props = defineProps<AccordionItemProps>();
const { summary = '', summaryClass = '', summaryActiveClass = '' } = props;
const emit = defineEmits(['update:modelValue']);

const internalModelValue = useVModel(props, 'modelValue', emit, { passive: true });

const finalSummaryClass = computed(() => {
  if (internalModelValue.value) {
    return summaryClass && summaryActiveClass
      ? `${summaryClass} ${summaryActiveClass}`
      : summaryClass || summaryActiveClass;
  }

  return summaryClass;
});
</script>

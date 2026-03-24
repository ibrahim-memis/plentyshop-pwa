<template>
  <form ref="referenceRef" role="search" class="relative" @submit.prevent="handleSubmit">
    <SfInput
      id="search-bar"
      ref="inputReference"
      v-model="inputModel"
      data-testid="search-bar-input"
      wrapper-class="!bg-transparent !border !border-neutral-200 !ring-0 !rounded-lg hover:!border-neutral-300 focus-within:!bg-white focus-within:!border-neutral-400 focus-within:!ring-2 focus-within:!ring-neutral-200 transition-all duration-200 !h-12"
      :aria-label="t('common.actions.search')"
      :placeholder="t('header.searchPlaceholder')"
      size="base"
      @focus="open"
    >
      <template #prefix>
        <SfLoaderCircular v-if="loading" size="sm" />
        <SfIconSearch v-else class="text-neutral-400 !w-5 !h-5" />
      </template>
      <template #suffix>
        <button
          v-if="inputModel"
          type="button"
          :aria-label="t('common.actions.resetSearch')"
          class="flex rounded-full hover:bg-neutral-200 p-0.5 focus-visible:outline focus-visible:outline-offset transition-colors"
          @click="handleReset"
        >
          <SfIconCancel class="text-neutral-400" />
        </button>
        <button
          v-else
          type="submit"
          class="flex items-center justify-center bg-[#384d37] hover:bg-[#2c3e2b] text-white rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-200 -mr-1 cursor-pointer"
        >
          {{ t('common.actions.search') }}
        </button>
      </template>
    </SfInput>
  </form>
</template>

<script setup lang="ts">
import { SfIconCancel, SfIconSearch, SfInput, useDisclosure, SfLoaderCircular } from '@storefront-ui/vue';
import { unrefElement } from '@vueuse/core';

const props = defineProps<{
  close?: () => boolean;
}>();

const localePath = useLocalePath();
const router = useRouter();
const { open } = useDisclosure();
const { updateSearchTerm } = useCategoryFilter();
const { loading } = useSearch();
const { emit } = usePlentyEvent();

const inputModel = ref('');
const inputReference = ref<HTMLSpanElement>();
const handleInputFocus = () => {
  const inputElement = unrefElement(inputReference)?.querySelector('input');
  inputElement?.focus();
};
const handleReset = () => {
  inputModel.value = '';
  handleInputFocus();
};
const handleSubmit = () => {
  props.close?.();
  updateSearchTerm(inputModel.value);
  emit('frontend:searchProduct', inputModel.value);
  router.push({ path: localePath(paths.search), query: { term: inputModel.value } });
  handleReset();
};

watch(inputModel, () => {
  if (inputModel.value === '') {
    handleReset();
  }
});
</script>

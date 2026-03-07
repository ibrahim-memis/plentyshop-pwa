<template>
  <NuxtLazyHydrate when-visible>
    <ProductSlider v-bind="$attrs" :wrapper-class="['max-w-[1536px] mx-auto px-6 lg:px-8 mb-20', $attrs.class]" />
  </NuxtLazyHydrate>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

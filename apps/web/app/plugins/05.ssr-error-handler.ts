export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error, instance, info) => {
    if (import.meta.server) {
      console.error('[SSR vue:error]', info, error);
    }
  });

  nuxtApp.hook('app:error', (error) => {
    if (import.meta.server) {
      console.error('[SSR app:error]', error);
    }
  });
});

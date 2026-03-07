const SSR_INIT_TIMEOUT_MS = 8000;

export default defineNuxtPlugin({
  name: 'init-initial-data',
  async setup() {
    const { setInitialDataSSR } = useInitialSetup();
    await callOnce(async () => {
      try {
        await Promise.race([
          setInitialDataSSR(),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('SSR init timeout')), SSR_INIT_TIMEOUT_MS),
          ),
        ]);
      } catch (error) {
        console.error('[init-initial-data] SSR init failed, continuing with empty state:', error);
      }
    });
  },
});

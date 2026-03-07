export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (err, instance, info) => {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('recursive updates exceeded')) {
      try {
        const getName = (inst: any): string => {
          if (!inst) return 'null';
          try {
            return (
              inst.$options?.name ||
              inst.$options?.__name ||
              inst.$?.type?.name ||
              inst.$?.type?.__name ||
              inst.$?.type?.__file?.split('/').pop()?.replace('.vue', '') ||
              'Unknown'
            );
          } catch {
            return 'Unknown(access-error)';
          }
        };

        const getFile = (inst: any): string => {
          if (!inst) return '';
          try {
            return inst.$?.type?.__file || inst.$options?.__file || '';
          } catch {
            return '';
          }
        };

        const componentName = getName(instance);
        const componentFile = getFile(instance);

        const parentChain: string[] = [];
        try {
          let parent = instance?.$parent;
          let depth = 0;
          while (parent && depth < 15) {
            parentChain.push(`${getName(parent)}(${getFile(parent).split('/').pop() || '?'})`);
            parent = parent.$parent;
            depth++;
          }
        } catch {
          parentChain.push('(chain-access-error)');
        }

        console.error(
          `%c[RECURSIVE UPDATE DETECTED]%c\n` +
          `  Component: ${componentName}\n` +
          `  File: ${componentFile}\n` +
          `  Info: ${info}\n` +
          `  Parent chain: ${parentChain.join(' -> ')}`,
          'background: red; color: white; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
          'color: red;',
        );
        console.trace('[RECURSIVE UPDATE STACK TRACE]');
      } catch (pluginErr) {
        console.error('[RECURSIVE UPDATE] Plugin handler itself failed:', pluginErr);
        console.error('[RECURSIVE UPDATE] Original error:', msg, 'Info:', info);
        console.trace('[RECURSIVE UPDATE STACK TRACE]');
      }
      return;
    }

    console.error('[Vue Error]', msg, '\nComponent:', instance, '\nInfo:', info);
  };
});

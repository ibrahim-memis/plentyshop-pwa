import type { Block } from '@plentymarkets/shop-api';
import type { BlockVisibilityRegistry, UseBlocksVisibilityReturn } from './types';

export const useBlocksVisibility: UseBlocksVisibilityReturn = () => {
  const visibilityRegistry = useState<BlockVisibilityRegistry>('block-visibility-registry', () => ({}));
  const isHydrationComplete = useState<boolean>('block-visibility-hydration-complete', () => false);

  const hasStaticContent = (block: Block): boolean => {
    const options = block?.content;
    return !(!options || (typeof options === 'object' && Object.keys(options).length === 0));
  };

  /**
   * Register a block's runtime visibility state.
   * Uses raw object mutation + nextTick to batch multiple registrations into one reactive trigger.
   */
  const registerBlockVisibility = (uuid: string, hasData: boolean) => {
    const raw = toRaw(visibilityRegistry.value);
    if (raw[uuid] === hasData) return;
    raw[uuid] = hasData;
    triggerRef(visibilityRegistry);
  };

  const clearRegistry = () => {
    visibilityRegistry.value = {};
  };

  const shouldShowBlock = (block: Block, isEditorModeEnabled = false): boolean => {
    if (!block?.meta) return false;
    if (isEditorModeEnabled) return true;
    if (!hasStaticContent(block)) return false;

    if (isHydrationComplete.value) {
      const raw = toRaw(visibilityRegistry.value);
      const runtimeVisibility = raw[block.meta.uuid];
      if (runtimeVisibility !== undefined) {
        return runtimeVisibility;
      }
    }

    return true;
  };

  return {
    shouldShowBlock,
    registerBlockVisibility,
    clearRegistry,
    isHydrationComplete,
  };
};

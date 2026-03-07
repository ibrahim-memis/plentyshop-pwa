import type {
  GetCombination,
  GetValue,
  SetAttribute,
  UpdateValue,
  UseProductAttributesReturn,
  UseProductAttributesState,
} from './types';
import type { Product, VariationMapProductVariation } from '@plentymarkets/shop-api';

export const useProductAttributes = (): UseProductAttributesReturn => {
  const state = useState<UseProductAttributesState>(`useProductAttributes`, () => ({
    attributes: [],
    attributeValues: {},
    combinations: [],
    itemId: 0,
    variationId: 0,
  }));

  const changeVariationId = (variationId: number): void => {
    if (state.value.variationId === variationId) return;

    const route = useRoute();
    const path = updateProductURLPathForVariation(route.path, state.value.itemId, variationId);

    state.value.variationId = variationId;
    navigateTo(path);
  };

  const getCombination: GetCombination = (): VariationMapProductVariation | null => {
    return (
      state.value.combinations.find((combination) => {
        if (combination?.attributes?.length === Object.values(state.value.attributeValues).length) {
          return combination.attributes?.every((attribute) => {
            return state.value.attributeValues[attribute.attributeId] === attribute.attributeValueId;
          });
        }
        return false;
      }) ?? null
    );
  };

  const combinationMatchesAttributes = (
    combination: VariationMapProductVariation,
    attributeValues: Record<number, number>,
  ): boolean => {
    return Object.entries(attributeValues).every(([attributeId, valueId]) => {
      return combination.attributes?.some((attribute) => {
        return attribute.attributeId === Number(attributeId) && attribute.attributeValueId === valueId;
      });
    });
  };

  const isValueAvailableInCombinations = (attributeValues: Record<number, number>): boolean => {
    return (
      state.value.combinations?.some((combination) => combinationMatchesAttributes(combination, attributeValues)) ??
      false
    );
  };

  /**
   * Compute disabled states for all attribute values WITHOUT mutating state.
   * Returns a new attributes array with updated `disabled` flags.
   */
  const computeDisabledAttributes = (
    attributes: UseProductAttributesState['attributes'],
    combinations: UseProductAttributesState['combinations'],
    attributeValues: Record<number, number>,
  ) => {
    return attributes.map((attribute) => ({
      ...attribute,
      values: attribute.values.map((value) => {
        const testValues = { ...attributeValues, [attribute.attributeId]: value.attributeValueId };
        const available = combinations?.some((combination) =>
          combinationMatchesAttributes(combination, testValues),
        ) ?? false;
        return { ...value, disabled: !available };
      }),
    }));
  };

  /**
   * Find matching combination for given attribute values.
   */
  const findCombination = (
    combinations: UseProductAttributesState['combinations'],
    attributeValues: Record<number, number>,
  ): VariationMapProductVariation | null => {
    return (
      combinations.find((combination) => {
        if (combination?.attributes?.length === Object.values(attributeValues).length) {
          return combination.attributes?.every(
            (attr) => attributeValues[attr.attributeId] === attr.attributeValueId,
          );
        }
        return false;
      }) ?? null
    );
  };

  let isSettingAttributes = false;

  const setAttribute: SetAttribute = (product: Product, preSelectAttributes = false) => {
    if (isSettingAttributes) return;
    if (!product?.item || !product?.variation) return;
    isSettingAttributes = true;

    try {
      const clonedAttributes = JSON.parse(
        JSON.stringify(product.variationAttributeMap?.attributes || []),
      );
      const clonedCombinations = JSON.parse(
        JSON.stringify(product.variationAttributeMap?.variations || []),
      );

      const newAttributeValues: Record<number, number> = {};
      if (preSelectAttributes) {
        product.attributes?.forEach((attribute) => {
          newAttributeValues[attribute.attributeId] = attribute.value.id;
        });
      }

      const withDisabled = computeDisabledAttributes(clonedAttributes, clonedCombinations, newAttributeValues);

      state.value.itemId = product.item.id;
      state.value.variationId = product.variation.id;
      state.value.combinations = clonedCombinations;
      state.value.attributeValues = newAttributeValues;
      state.value.attributes = withDisabled;
    } finally {
      isSettingAttributes = false;
    }
  };

  const applyDisabledAndNavigate = () => {
    const newAttrs = computeDisabledAttributes(
      state.value.attributes,
      state.value.combinations,
      state.value.attributeValues,
    );
    state.value.attributes = newAttrs;

    const combination = findCombination(state.value.combinations, state.value.attributeValues);
    if (combination) {
      changeVariationId(Number(combination.variationId));
    }
  };

  const updateValue: UpdateValue = (attributeId: number, valueId: number | undefined) => {
    const item = state.value.attributes.find((attribute) => attribute.attributeId === attributeId);
    const value = item?.values.find((v) => v.attributeValueId === valueId) || undefined;

    if (!value || !valueId) {
      delete state.value.attributeValues.attributeId;
      applyDisabledAndNavigate();
      return;
    }

    if (value.disabled) {
      delete state.value.attributeValues.attributeId;
      const oldValues = { ...state.value.attributeValues };
      state.value.attributeValues = { [attributeId]: valueId };
      applyDisabledAndNavigate();

      Object.entries(oldValues).forEach(([oldKey, oldValueId]) => {
        const oldAttr = state.value.attributes
          .find((a) => a.attributeId === Number(oldKey))
          ?.values.find((v) => v.attributeValueId === oldValueId);

        if (oldAttr && !oldAttr.disabled) {
          state.value.attributeValues[oldKey] = oldValueId;
        }
      });

      applyDisabledAndNavigate();
      return;
    }

    if (state.value.attributeValues[attributeId] !== valueId) {
      state.value.attributeValues[attributeId] = valueId;
    }

    applyDisabledAndNavigate();
  };

  const getValue: GetValue = (attributeId: number): number | undefined => {
    return state.value.attributeValues[attributeId] || undefined;
  };

  return {
    ...toRefs(state.value),
    setAttribute,
    updateValue,
    getValue,
    getCombination,
  };
};

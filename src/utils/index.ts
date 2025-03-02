import { normalizeStylesCache } from './normalizeStyles';
import { resolveComponentStylesCache } from './resolveComponentStyles';
export { default as normalizeStyles } from './normalizeStyles';
export { resolveComponentStyles, flattenStateStyles } from './resolveComponentStyles';
export { default as mergeRefs } from './mergeRefs';
export { default as composeEventHandlers } from './composeEventHandlers';
export { normalizeSpacings, SpacingType, SpacingKey } from './normalizeSpacings';
export {
    DocumentPicker,
    DocumentPickerOptions,
    DocumentResult,
    documentTypes,
} from './DocumentPicker';

export { normalizeBorderRadiuses } from './normalizeBorderRadiuses';

export * from './lodash';
export * from './compare';

export * from './date-fns';

export { BackgroundContext } from './backgroundContext';

export { createNumberMask, CreateNumberMaskProps } from './createNumberMask';
export { formatNumberWithMask, FormatNumberWithMaskProps } from './formatNumberWithMask';
export { normalizeToNumberString, NormalizeToNumberStringProps } from './normalizeToNumberString';

export { addEventListener, addListener } from './addEventListener';

export const clearStylesCache = () => {
    normalizeStylesCache.clear();
    resolveComponentStylesCache.clear();
};

export { getYearRange } from './getyearRange';

export * from './getOS';
export { default as color, resolveContrastColor } from './color';

export * from './createSyntheticEvent';
export * from './getCursorStyle';

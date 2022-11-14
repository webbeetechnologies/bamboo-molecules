import { useTheme as useThemeAtoms } from '@webbee/bamboo-atoms';
export { useColorMode, useMediaQuery } from '@webbee/bamboo-atoms';
import type { ITheme } from '../core';

export { default as useMolecules } from './useMolecules';
export { default as usePlatformType } from './usePlatformType';
export { default as useComponentStyles } from './useComponentStyles';
export { default as useCurrentTheme } from './useCurrentTheme';
export { default as useToggle } from './useToggle';
export { default as useControlledValue } from './useControlledValue';
export { default as useFilePicker } from './useFilePicker';
export { default as useLatest } from './useLatest';

export * from "./useKeyboardDismissable"

export const useTheme: <T extends ITheme>() => T = useThemeAtoms;

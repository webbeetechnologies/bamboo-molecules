import { useTheme as useThemeAtoms } from '@webbee/bamboo-atoms';
export { useColorMode } from '@webbee/bamboo-atoms';
import type { ITheme } from '../core';

export { default as useMolecules } from './useMolecules';
export { default as usePlatformType } from './usePlatformType';
export { default as useComponentStyles } from './useComponentStyles';
export { default as useCurrentTheme } from './useCurrentTheme';
export { default as useToggle } from './useToggle';

export const useTheme: <T extends ITheme>() => T = useThemeAtoms;

import { useTheme as useThemeAtoms, useColorMode as useColorModeAtoms } from '@webbee/bamboo-atoms';
import type { ITheme } from '../core';

export { default as useMolecules } from './useMolecules';
export { default as usePlatformType } from './usePlatformType';
export { default as useComponentTheme } from './useComponentTheme';
export { default as useCurrentTheme } from './useCurrentTheme';

export const useTheme: <T extends ITheme>() => T = useThemeAtoms;

export const useColorMode = useColorModeAtoms;

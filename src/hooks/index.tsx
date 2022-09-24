import { useTheme as useThemeAtoms } from '@webbee/bamboo-atoms';
import type { ITheme } from '../core';

export { default as useMolecules } from './useMolecules';
export { default as usePlatformType } from './usePlatformType';
export { default as useComponentTheme } from './useComponentTheme';

export const useTheme: <T extends ITheme>() => T = useThemeAtoms;

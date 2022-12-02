import type { ITheme } from '../core';
import { useTheme as useThemeAtoms } from '@webbee/bamboo-atoms';

const useTheme: <T extends ITheme>() => T = useThemeAtoms;

export default useTheme;

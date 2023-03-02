import type { ITheme } from '../core';
import { useTheme as useThemeAtoms } from '@bambooapp/bamboo-atoms';

export const useTheme: <T extends ITheme>() => T = useThemeAtoms;

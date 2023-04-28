import { extendTheme as extendThemeAtoms } from '@bambooapp/bamboo-atoms';
import merge from 'ts-deepmerge';

import type { DeepPartial } from '../../types';
import { defaultThemeValue } from './defaultTheme';
import type { ITheme } from './types';

export const extendTheme = (theme: DeepPartial<ITheme>): ITheme =>
    extendThemeAtoms(merge(defaultThemeValue, theme)) as ITheme;

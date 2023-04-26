import type { DefaultComponents as _DefaultComponents } from './core/components/types';
import type { ITheme as _ITheme } from './core/theme/types';

/**
 * The types here can be overwritten with global.d.ts from consumer
 * */
declare global {
    type DefaultComponents = _DefaultComponents;
    type ITheme = _ITheme;
}

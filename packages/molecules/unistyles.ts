import { MD3LightTheme, MD3DarkTheme } from './src/styles';

type AppThemes = {
    light: typeof MD3LightTheme;
    dark: typeof MD3DarkTheme;
};

export const breakpoints = {
    xs: 0,
    smallMobile: 398,
    mobile: 496,
    tablet: 768,
    smallDesktop: 992,
    desktop: 120,
    default: Infinity,
};

type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
    export interface UnistylesThemes extends AppThemes {}
    export interface UnistylesBreakpoints extends AppBreakpoints {}
}

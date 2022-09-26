import type { ReactNode } from 'react';
import type { ITheme as AtomsTheme } from '@webbee/bamboo-atoms';

export type ITheme = AtomsTheme & {
    light: MD3Theme;
    dark: MD3Theme;
};

export type MD3Theme = {
    animation: {
        scale: number;
    };
    colors: MD3Colors;
    elevation: MD3ElevationColors;
    typescale: MD3Typescale;
    roundness: number[];
    spacing: (number | string)[];
};

export interface ProvideThemeArgs {
    theme: ITheme;
    children: ReactNode;
}

export type Font = {
    fontFamily: string;
    fontWeight?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900';
};

export type MD3Colors = {
    primary: string;
    primaryContainer: string;
    secondary: string;
    secondaryContainer: string;
    tertiary: string;
    tertiaryContainer: string;
    surface: string;
    surfaceVariant: string;
    surfaceDisabled: string;
    background: string;
    error: string;
    errorContainer: string;
    onPrimary: string;
    onPrimaryContainer: string;
    onSecondary: string;
    onSecondaryContainer: string;
    onTertiary: string;
    onTertiaryContainer: string;
    onSurface: string;
    onSurfaceVariant: string;
    onSurfaceDisabled: string;
    onError: string;
    onErrorContainer: string;
    onBackground: string;
    outline: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    backdrop: string;
};

export enum MD3TypescaleKey {
    displayLarge = 'displayLarge',
    displayMedium = 'displayMedium',
    displaySmall = 'displaySmall',

    headlineLarge = 'headlineLarge',
    headlineMedium = 'headlineMedium',
    headlineSmall = 'headlineSmall',

    titleLarge = 'titleLarge',
    titleMedium = 'titleMedium',
    titleSmall = 'titleSmall',

    labelLarge = 'labelLarge',
    labelMedium = 'labelMedium',
    labelSmall = 'labelSmall',

    bodyLarge = 'bodyLarge',
    bodyMedium = 'bodyMedium',
    bodySmall = 'bodySmall',
}

export type MD3Type = {
    fontFamily: string;
    letterSpacing: number;
    fontWeight: Font['fontWeight'];
    lineHeight: number;
    fontSize: number;
};

export type MD3Typescale = {
    [key in MD3TypescaleKey]: MD3Type;
};

export type MD3Elevation = 0 | 1 | 2 | 3 | 4 | 5;

export enum ElevationLevels {
    'level0',
    'level1',
    'level2',
    'level3',
    'level4',
    'level5',
}

export type MD3ElevationColors = {
    [key in keyof typeof ElevationLevels]: string;
};

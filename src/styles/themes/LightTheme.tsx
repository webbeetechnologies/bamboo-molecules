import color from 'color';
import type { MD3Theme } from '../../core/theme/types';
import { MD3Colors, tokens, typescale } from './tokens';

const ref = tokens.md.ref;

export const generateLightThemeColors = (
    palette: typeof ref.palette,
    opacity: typeof ref.opacity,
) => {
    return {
        primary: palette.primary40,
        primaryContainer: palette.primary90,
        primaryOnHover: color(palette.primary40).darken(0.05).rgb().string(),
        primaryContainerOnHover: color(palette.primary40).lighten(0.99).rgb().string(),
        secondary: palette.secondary40,
        secondaryContainer: palette.secondary90,
        secondaryContainerOnHover: color(palette.secondary40).lighten(0.99).rgb().string(),
        tertiary: palette.tertiary40,
        tertiaryContainer: palette.tertiary90,
        surface: palette.neutral99,
        surfaceVariant: palette.neutralVariant90,
        surfaceDisabled: color(palette.neutral10).alpha(opacity.level2).rgb().string(),
        background: palette.neutral99,
        error: palette.error40,
        errorContainer: palette.error90,
        onPrimary: palette.primary100,
        onPrimaryContainer: palette.primary10,
        onSecondary: palette.secondary100,
        onSecondaryContainer: palette.secondary10,
        onTertiary: palette.tertiary100,
        onTertiaryContainer: palette.tertiary10,
        onSurface: palette.neutral10,
        onSurfaceVariant: palette.neutralVariant30,
        onSurfaceDisabled: color(palette.neutral10).alpha(opacity.level4).rgb().string(),
        onSurfaceRipple: color(palette.neutral10).alpha(0.12).rgb().string(),
        onError: palette.error100,
        onErrorContainer: palette.error10,
        onBackground: palette.neutral10,
        outline: palette.neutralVariant50,
        inverseSurface: palette.neutral20,
        inverseOnSurface: palette.neutral95,
        inversePrimary: palette.primary80,
        backdrop: color(MD3Colors.neutralVariant20).alpha(0.4).rgb().string(),
        disabled: palette.neutral70,
        disabledOnBackground: color(palette.neutral0).alpha(0.12).rgb().string(),
        neutral1: palette.neutral100,
        onNeutral1: palette.neutral70,
        elevation: {
            level0: 'transparent',
            // Note: Color values with transparency cause RN to transfer shadows to children nodes
            // instead of View component in Surface. Providing solid background fixes the issue.
            // Opaque color values generated with `palette.primary99` used as background
            level1: color(palette.primary40).alpha(0.05).rgb().string(), // palette.primary40, alpha 0.05
            level2: color(palette.primary40).alpha(0.08).rgb().string(), // palette.primary40, alpha 0.08
            level3: color(palette.primary40).alpha(0.11).rgb().string(), // palette.primary40, alpha 0.11
            level4: color(palette.primary40).alpha(0.12).rgb().string(), // palette.primary40, alpha 0.12
            level5: color(palette.primary40).alpha(0.14).rgb().string(), // palette.primary40, alpha 0.14
        },
    };
};

export const MD3LightTheme: MD3Theme = {
    dark: false,
    colors: generateLightThemeColors(ref.palette, ref.opacity),
    typescale,
    animation: {
        scale: 1.0,
        durations: {
            '0': 0,
            '1': 100,
        },
    },
    roundness: {
        '0': 0,
        '1': 4,
        '2': 8,
        '3': 12,
        '4': 16,
        '5': 20,
        '6': 24,
        '4l': 18,
    },
    letterSpacings: {
        xxs: -1.5,
        xs: -0.5,
        sm: 0,
        md: 0.1,
        lg: 0.15,
        xl: 0.25,
        '2xl': 0.4,
        '3xl': 0.5,
        '4xl': 1.25,
        '5xl': 1.5,
    },
    lineHeights: {
        xs: 1.25,
        sm: 1.375,
        md: 1.5,
        lg: 1.625,
        xl: 2,
    },
    fontWeights: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },
    fontSizes: {
        xxs: 10,
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
        '5xl': 48,
        '6xl': 60,
        '7xl': 72,
        '8xl': 96,
        '9xl': 128,
    },
    spacings: {
        '0': 0,
        '1': 4,
        '2': 8,
        '3': 12,
        '4': 16,
        '5': 20,
        '6': 24,
        '7': 28,
        '8': 32,
        '9': 36,
        '10': 40,
        '12': 48,
        '16': 64,
        '20': 80,
        '24': 96,
        '32': 128,
        '40': 160,
        '48': 192,
        '56': 224,
        '64': 256,
        '72': 288,
        '80': 320,
        '96': 384,
        px: 1,
        '1l': 6,
    },
};

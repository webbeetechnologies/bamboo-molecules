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
    },
    roundness: [0, 4], // dummy values
    spacing: [0, 5], // dummy values
};

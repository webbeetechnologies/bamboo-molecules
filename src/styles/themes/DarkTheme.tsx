import color from 'color';
import type { MD3Theme } from '../../core/theme/types';
import { MD3LightTheme } from './LightTheme';
import { tokens } from './tokens';

const ref = tokens.md.ref;

export const generateDarkThemeColors = (
    palette: typeof ref.palette,
    opacity: typeof ref.opacity,
) => {
    return {
        primary: palette.primary70,
        primaryContainer: palette.primary30,
        primaryOnHover: color(palette.primary80).darken(0.12).rgb().string(),
        primaryContainerOnHover: color(palette.primary80).darken(0.9).rgb().string(),
        secondary: palette.secondary80,
        secondaryContainer: palette.secondary30,
        secondaryContainerOnHover: color(palette.secondary30).darken(0.25).rgb().string(),
        tertiary: palette.tertiary80,
        tertiaryContainer: palette.tertiary30,
        surface: palette.neutral10,
        surfaceVariant: palette.neutralVariant30,
        surfaceDisabled: color(palette.neutral90).alpha(opacity.level2).rgb().string(),
        background: palette.neutral10,
        error: palette.error80,
        errorContainer: palette.error30,
        onPrimary: palette.primary20,
        onPrimaryContainer: palette.primary90,
        onSecondary: palette.secondary20,
        onSecondaryContainer: palette.secondary90,
        onTertiary: palette.tertiary20,
        onTertiaryContainer: palette.tertiary90,
        onSurface: palette.neutral90,
        onSurfaceVariant: palette.neutralVariant80,
        onSurfaceDisabled: color(palette.neutral90).alpha(opacity.level4).rgb().string(),
        onSurfaceRipple: color(palette.neutral90).alpha(0.12).rgb().string(),
        onError: palette.error20,
        onErrorContainer: palette.error80,
        onBackground: palette.neutral90,
        outline: palette.neutralVariant60,
        inverseSurface: palette.neutral90,
        inverseOnSurface: palette.neutral20,
        inversePrimary: palette.primary40,
        backdrop: color(palette.neutralVariant20).alpha(0.4).rgb().string(),
        disabled: palette.neutral40,
        disabledOnBackground: color(palette.neutral100).alpha(0.1).rgb().string(),
        onSurfaceNeutral: palette.neutral0,
        neutral1: palette.neutral70,
        onNeutral1: palette.neutral40,
        elevation: {
            level0: 'transparent',
            // Note: Color values with transparency cause RN to transfer shadows to children nodes
            // instead of View component in Surface. Providing solid background fixes the issue.
            // Opaque color values generated with `palette.primary80` used as background
            level1: color(palette.primary80).alpha(0.05).rgb().string(), // palette.primary80, alpha 0.05
            level2: color(palette.primary80).alpha(0.08).rgb().string(), // palette.primary80, alpha 0.08
            level3: color(palette.primary80).alpha(0.11).rgb().string(), // palette.primary80, alpha 0.11
            level4: color(palette.primary80).alpha(0.12).rgb().string(), // palette.primary80, alpha 0.12
            level5: color(palette.primary80).alpha(0.14).rgb().string(), // palette.primary80, alpha 0.14
        },
    };
};

export const MD3DarkTheme: MD3Theme = {
    ...MD3LightTheme,
    dark: true,
    colors: generateDarkThemeColors(ref.palette, ref.opacity),
};

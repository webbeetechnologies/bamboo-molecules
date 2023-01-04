import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

export type CustomProps = {
    innerContainer?: ViewStyle;
};

export const appbarBaseStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    paddingHorizontal: 'spacings.4',
    backgroundColor: 'colors.surface',
    flex: 1,
    minHeight: 64,

    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
};

export const appbarCenterAlignedStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> =
    {
        minHeight: 64,
    };

export const appbarSmallStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    minHeight: 64,
};

export const appbarMediumStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    paddingHorizontal: 'spacings.4',
    paddingVertical: 'spacings.5',
    minHeight: 112,

    innerContainer: {
        marginBottom: 'spacings.6',
    },
};

export const appbarLargeStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    paddingHorizontal: 'spacings.4',
    paddingVertical: 'spacings.5',
    minHeight: 152,

    innerContainer: {
        marginBottom: 'spacings.6',
    },
};

export const appbarTitle: ComponentStylePropWithVariants<TextStyle> = {
    display: 'flex',
    flex: 1,
    color: 'colors.onSurface',

    sizes: {
        sm: {
            lineHeight: 'typescale.titleLarge.lineHeight',
            fontSize: 'typescale.titleLarge.fontSize',
            fontWeight: 'typescale.titleLarge.fontWeight',
        },
        md: {
            lineHeight: 'typescale.headlineSmall.lineHeight',
            fontSize: 'typescale.headlineSmall.fontSize',
            fontWeight: 'typescale.headlineSmall.fontWeight',
        },
        lg: {
            lineHeight: 'typescale.headlineMedium.lineHeight',
            fontSize: 'typescale.headlineMedium.fontSize',
            fontWeight: 'typescale.headlineMedium.fontWeight',
        },
    },
};

export const appbarRight: ComponentStylePropWithVariants<
    ViewStyle,
    '',
    { spacing?: number | string }
> = {
    spacing: 'spacings.6',
    flexDirection: 'row',
    alignItems: 'center',
};

export const appbarLeft: ComponentStylePropWithVariants<
    ViewStyle,
    '',
    { spacing?: number | string }
> = {
    flexDirection: 'row',
    alignItems: 'center',
};

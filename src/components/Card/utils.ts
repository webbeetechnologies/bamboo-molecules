import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'hovered' | 'focused' | 'pressed' | 'disabled';
type CustomProps = {
    animationDuration?: string;
    container?: ViewStyle;
    innerContainer?: ViewStyle;
};

export const cardStyles: ComponentStylePropWithVariants<ViewStyle, States, CustomProps> = {
    animationDuration: 'animation.durations.1',

    container: {
        borderRadius: 'shapes.corner.medium' as unknown as number,
    },
    innerContainer: {
        borderRadius: 'shapes.corner.medium' as unknown as number,
    },

    variants: {
        elevated: {
            backgroundColor: 'colors.surface',

            states: {
                disabled: {
                    backgroundColor: 'colors.surfaceVariant',
                    opacity: 0.38,
                },
            },
        },
        filled: {
            backgroundColor: 'colors.surfaceVariant',

            states: {
                disabled: {
                    backgroundColor: 'colors.surface',
                    opacity: 0.38,
                },
            },
        },
        outlined: {
            backgroundColor: 'colors.surface',
            borderWidth: 1,
            borderColor: 'colors.outline',

            states: {
                disabled: {
                    opacity: 0.12,
                },
            },
        },
    },
};

export const cardTypograhyStyles: ComponentStylePropWithVariants<TextStyle> = {
    variants: {
        headline: {
            marginBottom: 'spacings.3',

            sizes: {
                sm: {
                    lineHeight: 'typescale.headlineSmall.lineHeight',
                    fontSize: 'typescale.headlineSmall.fontSize',
                    fontWeight: 'typescale.headlineSmall.fontWeight',
                },
                md: {
                    lineHeight: 'typescale.headlineMedium.lineHeight',
                    fontSize: 'typescale.headlineMedium.fontSize',
                    fontWeight: 'typescale.headlineMedium.fontWeight',
                },
                lg: {
                    lineHeight: 'typescale.headlineLarge.lineHeight',
                    fontSize: 'typescale.headlineLarge.fontSize',
                    fontWeight: 'typescale.headlineLarge.fontWeight',
                },
            },
        },
        subhead: {
            marginBottom: 'spacings.3',

            sizes: {
                sm: {
                    lineHeight: 'typescale.titleSmall.lineHeight',
                    fontSize: 'typescale.titleSmall.fontSize',
                    fontWeight: 'typescale.titleSmall.fontWeight',
                },
                md: {
                    lineHeight: 'typescale.titleMedium.lineHeight',
                    fontSize: 'typescale.titleMedium.fontSize',
                    fontWeight: 'typescale.titleMedium.fontWeight',
                },
                lg: {
                    lineHeight: 'typescale.titleLarge.lineHeight',
                    fontSize: 'typescale.titleLarge.fontSize',
                    fontWeight: 'typescale.titleLarge.fontWeight',
                },
            },
        },
        text: {
            marginBottom: 'spacings.1',

            sizes: {
                sm: {
                    lineHeight: 'typescale.bodySmall.lineHeight',
                    fontSize: 'typescale.bodySmall.fontSize',
                    fontWeight: 'typescale.bodySmall.fontWeight',
                },
                md: {
                    lineHeight: 'typescale.bodyMedium.lineHeight',
                    fontSize: 'typescale.bodyMedium.fontSize',
                    fontWeight: 'typescale.bodyMedium.fontWeight',
                },
                lg: {
                    lineHeight: 'typescale.bodyLarge.lineHeight',
                    fontSize: 'typescale.bodyLarge.fontSize',
                    fontWeight: 'typescale.bodyLarge.fontWeight',
                },
            },
        },
    },
};

export const cardMediaStyles: ComponentStylePropWithVariants<ViewStyle> = {
    height: 195,
    borderTopLeftRadius: 'shapes.corner.medium' as unknown as number,
    borderTopRightRadius: 'shapes.corner.medium' as unknown as number,
    borderBottomLeftRadius: 'shapes.corner.medium' as unknown as number,
    borderBottomRightRadius: 'shapes.corner.medium' as unknown as number,
    overflow: 'hidden',
};

export const cardContentStyles: ComponentStylePropWithVariants<ViewStyle> = {
    padding: 'spacings.4',
};

export const cardActionsStyles: ComponentStylePropWithVariants<ViewStyle> = {
    paddingHorizontal: 'spacings.4',
    paddingBottom: 'spacings.4',
    flexDirection: 'row',
    alignItems: 'center',
};

export const cardHeaderStyles: ComponentStylePropWithVariants<ViewStyle> = {
    paddingHorizontal: 'spacings.4',
    paddingTop: 'spacings.4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
};

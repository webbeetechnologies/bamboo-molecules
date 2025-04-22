import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

export type States = 'hovered' | 'focused' | 'pressed' | 'disabled';
export type CardTypographyVariant = 'headline' | 'subhead' | 'text';
export type CardTypographySize = 'sm' | 'md' | 'lg';

const cardStylesDefault = StyleSheet.create(theme => ({
    root: {
        animationDuration: `${theme.animation.durations['1']}`,

        variants: {
            variant: {
                elevated: {},
                filled: {},
                outlined: {},
                undefined: {},
            },
        },
        compoundVariants: [
            {
                variant: 'outlined',
                state: 'disabled',
                styles: {
                    opacity: 0.12,
                },
            },
        ],
    },
    container: {
        borderRadius: theme.shapes.corner.medium,

        variants: {
            variant: {
                elevated: {
                    backgroundColor: theme.colors.surface,
                },

                filled: {
                    backgroundColor: theme.colors.surfaceVariant,
                },

                outlined: {},
            },
        },

        compoundVariants: [
            {
                variant: 'elevated',
                state: 'disabled',
                styles: {
                    backgroundColor: theme.colors.surfaceVariant,
                    opacity: 0.38,
                },
            },

            {
                variant: 'filled',
                state: 'disabled',
                styles: {
                    backgroundColor: theme.colors.surface,
                    opacity: 0.38,
                },
            },
        ],
    },
    innerContainer: {
        borderRadius: theme.shapes.corner.medium,
    },
}));

const cardTypograhyStylesDefault = StyleSheet.create(theme => ({
    root: {
        color: theme.colors.onSurface,

        variants: {
            variant: {
                headline: {
                    marginBottom: theme.spacings['3'],
                },
                subhead: {
                    marginBottom: theme.spacings['3'],
                },
                text: {
                    marginBottom: theme.spacings['1'],
                },
            },
        },
        compoundVariants: [
            {
                variant: 'headline',
                size: 'sm',
                styles: {
                    ...theme.typescale.headlineSmall,
                },
            },
            {
                variant: 'headline',
                size: 'md',
                styles: {
                    ...theme.typescale.headlineMedium,
                },
            },
            {
                variant: 'headline',
                size: 'lg',
                styles: {
                    ...theme.typescale.headlineLarge,
                },
            },
            {
                variant: 'subhead',
                size: 'sm',
                styles: {
                    ...theme.typescale.titleSmall,
                },
            },
            {
                variant: 'subhead',
                size: 'md',
                styles: {
                    ...theme.typescale.titleMedium,
                },
            },
            {
                variant: 'subhead',
                size: 'lg',
                styles: {
                    ...theme.typescale.titleLarge,
                },
            },
            {
                variant: 'text',
                size: 'sm',
                styles: {
                    ...theme.typescale.bodySmall,
                },
            },
            {
                variant: 'text',
                size: 'md',
                styles: {
                    ...theme.typescale.bodyMedium,
                },
            },
            {
                variant: 'text',
                size: 'lg',
                styles: {
                    ...theme.typescale.bodyLarge,
                },
            },
        ],
    },
}));

const cardMediaStylesDefault = StyleSheet.create(theme => ({
    root: {
        height: 195,
        borderRadius: theme.shapes.corner.medium,
        overflow: 'hidden',
        marginBottom: theme.spacings['4'],
    },
}));

const cardContentStylesDefault = StyleSheet.create(theme => ({
    root: {
        padding: theme.spacings['4'],
    },
}));

const cardActionsStylesDefault = StyleSheet.create(theme => ({
    root: {
        paddingHorizontal: theme.spacings['4'],
        paddingBottom: theme.spacings['4'],
        flexDirection: 'row',
        alignItems: 'center',
    },
}));

const cardHeaderStylesDefault = StyleSheet.create(theme => ({
    root: {
        paddingHorizontal: theme.spacings['4'],
        paddingTop: theme.spacings['4'],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

registerComponentsStyles({
    Card: cardStylesDefault,
    Card_Header: cardHeaderStylesDefault,
    Card_Content: cardContentStylesDefault,
    Card_Typography: cardTypograhyStylesDefault,
    Card_Media: cardMediaStylesDefault,
    Card_Actions: cardActionsStylesDefault,
});

export const cardStyles = getRegisteredMoleculesComponentStyles('Card');
export const cardTypograhyStyles = getRegisteredMoleculesComponentStyles('Card_Typography');
export const cardMediaStyles = getRegisteredMoleculesComponentStyles('Card_Media');
export const cardContentStyles = getRegisteredMoleculesComponentStyles('Card_Content');
export const cardActionsStyles = getRegisteredMoleculesComponentStyles('Card_Actions');
export const cardHeaderStyles = getRegisteredMoleculesComponentStyles('Card_Header');

import { StyleSheet } from 'react-native-unistyles';
import { CardVariant } from './types';

type States = 'hovered' | 'focused' | 'pressed' | 'disabled';
export type CardTypographyVariant = 'headline' | 'subhead' | 'text';
export type CardTypographySize = 'sm' | 'md' | 'lg';

export const cardStyles = StyleSheet.create(theme => ({
    root: {
        animationDuration: `${theme.animation.durations['1']}`,

        variants: {
            variant: {
                elevated: {
                    ...({ elevationLevel: theme.elevations.level1 } as any),
                },
                filled: {},
                outlined: {},
            },
        },
        compoundVariants: [
            {
                variant: 'elevated',
                state: 'disabled',
                styles: {},
            },
            {
                variant: 'elevated',
                state: 'hovered',
                styles: {
                    ...({ elevationLevel: theme.elevations.level2 } as any),
                },
            },
            {
                variant: 'filled',
                state: 'disabled',
                styles: {},
            },
            {
                variant: 'filled',
                state: 'hovered',
                styles: {
                    ...({ elevationLevel: theme.elevations.level1 } as any),
                },
            },
            {
                variant: 'outlined',
                state: 'disabled',
                styles: {
                    opacity: 0.12,
                },
            },
            {
                variant: 'outlined',
                state: 'hovered',
                styles: {
                    ...({ elevationLevel: theme.elevations.level1 } as any),
                },
            },
        ],
    },
    compoundVariantStyles: (variant: CardVariant, state: States) => {
        if (variant === 'elevated' && state === 'disabled') {
            return {
                root: {},
                container: {
                    backgroundColor: theme.colors.surfaceVariant,
                    opacity: 0.38,
                },
            } as any;
        }
        if (variant === 'elevated' && state === 'hovered') {
            return {
                root: {
                    ...({ elevationLevel: theme.elevations.level2 } as any),
                },
            };
        }

        if (variant === 'filled' && state === 'disabled') {
            return {
                root: {},
                container: {
                    backgroundColor: theme.colors.surface,
                    opacity: 0.38,
                },
            } as any;
        }
        if (variant === 'filled' && state === 'hovered') {
            return {
                root: {
                    ...({ elevationLevel: theme.elevations.level1 } as any),
                },
            };
        }

        if (variant === 'outlined' && state === 'disabled') {
            return {
                root: {
                    opacity: 0.12,
                },
            } as any;
        }
        if (variant === 'outlined' && state === 'hovered') {
            return {
                root: {
                    ...({ elevationLevel: theme.elevations.level1 } as any),
                },
            };
        }
        return {
            root: {},
        };
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
export const cardTypograhyStyles = StyleSheet.create(theme => ({
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

export const cardMediaStyles = StyleSheet.create(theme => ({
    root: {
        height: 195,
        borderRadius: theme.shapes.corner.medium,
        overflow: 'hidden',
        marginBottom: theme.spacings['4'],
    },
}));

export const cardContentStyles = StyleSheet.create(theme => ({
    root: {
        padding: theme.spacings['4'],
    },
}));

export const cardActionsStyles = StyleSheet.create(theme => ({
    root: {
        paddingHorizontal: theme.spacings['4'],
        paddingBottom: theme.spacings['4'],
        flexDirection: 'row',
        alignItems: 'center',
    },
}));

export const cardHeaderStyles = StyleSheet.create(theme => ({
    root: {
        paddingHorizontal: theme.spacings['4'],
        paddingTop: theme.spacings['4'],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

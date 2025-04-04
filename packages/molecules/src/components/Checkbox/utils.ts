import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create(theme => ({
    root: {
        color: theme.colors.onSurfaceVariant,
        ...{
            uncheckedColor: theme.colors.onSurfaceVariant,
            animationDuration: theme.animation.durations['1'],
        },

        variants: {
            size: {
                sm: {
                    padding: 6,
                    borderRadius: 16,
                    iconSize: 20,
                },
                md: {
                    padding: 6,
                    borderRadius: 18,
                    iconSize: 24,
                },
                lg: {
                    padding: 6,
                    borderRadius: 20,
                    iconSize: 28,
                },
            },

            state: {
                checked: {
                    color: theme.colors.primary,
                },
                checkedAndHovered: {
                    color: theme.colors.primary,
                },
                disabled: {
                    color: theme.colors.onSurfaceDisabled,
                    uncheckedColor: theme.colors.onSurfaceDisabled,
                    labelColor: theme.colors.onSurfaceDisabled,
                },
                hovered: {},
            },

            variant: {
                ios: {},
                android: {
                    ...({ animationScale: theme.animation.scale } as any),
                },
                item: {},
            },
        },

        compoundVariants: [
            {
                variant: 'android',
                size: 'sm',
                styles: {
                    width: 32,
                    height: 32,
                },
            },
            {
                variant: 'android',
                size: 'md',
                styles: {
                    width: 36,
                    height: 36,
                },
            },
            {
                variant: 'android',
                size: 'lg',
                styles: {
                    width: 40,
                    height: 40,
                },
            },
        ],
    },
    stateLayer: {
        compoundVariants: [
            {
                variant: 'android',
                state: 'hovered',
                styles: {
                    backgroundColor: theme.colors.stateLayer.hover.onSurface,
                },
            },
            {
                variant: 'android',
                state: 'checkedAndHovered',
                styles: {
                    backgroundColor: theme.colors.stateLayer.hover.primary,
                },
            },
        ],
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        flexShrink: 1,
        flexGrow: 1,
        variants: {
            variant: {
                item: {
                    color: theme.colors.onSurface,
                },
            },
            isLeading: {
                true: {
                    textAlign: 'right',
                    paddingLeft: 0,
                    paddingRight: theme.spacings['2'],
                },
                false: {
                    textAlign: 'left',
                    paddingLeft: theme.spacings['2'],
                    paddingRight: 0,
                },
            },
        },
        compoundVariants: [
            {
                variant: 'item',
                size: 'sm',
                styles: {
                    ...theme.typescale.bodyMedium,
                },
            },
            {
                variant: 'item',
                size: 'md',
                styles: {
                    ...theme.typescale.bodyMedium,
                },
            },
            {
                variant: 'item',
                size: 'lg',
                styles: {
                    ...theme.typescale.bodyLarge,
                },
            },
        ],
    },
    fillContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    // compoundVariantStyles: (variant: 'android' | 'ios' | 'item', size: Size, state: States) => {
    //     if (variant === 'android') {
    //         return {
    //             root: {
    //                 ...(size === 'sm' && { width: 32, height: 32 }),
    //                 ...(size === 'md' && { width: 36, height: 36 }),
    //                 ...(size === 'lg' && { width: 40, height: 40 }),
    //             },
    //             stateLayer: {
    //                 ...(state === 'hovered' && {
    //                     backgroundColor: theme.colors.stateLayer.hover.onSurface,
    //                 }),
    //                 ...(state === 'checkedAndHovered' && {
    //                     backgroundColor: theme.colors.stateLayer.hover.primary,
    //                 }),
    //             },
    //         } as any;
    //     }

    //     if (variant === 'item') {
    //         return {
    //             root: {
    //                 labelColor: 'colors.onSurface',
    //                 ...(size === 'sm' && { labelTypeScale: theme.typescale.bodyMedium }),
    //                 ...(size === 'md' && { labelTypeScale: theme.typescale.bodyLarge }),
    //                 ...(size === 'lg' && { labelTypeScale: theme.typescale.bodyLarge }),
    //             },
    //         };
    //     }
    // },
}));

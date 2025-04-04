import { StyleSheet } from 'react-native-unistyles';

export const tabsStyles = StyleSheet.create(theme => ({
    root: {
        activeColor: theme.colors.primary,
    } as any,

    itemsContainer: {
        flexDirection: 'row',
        position: 'relative',
        flex: 1,
    },

    indicator: {
        position: 'absolute',
        bottom: 0,

        variants: {
            variant: {
                primary: {
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                },
                secondary: {
                    height: 2,
                },
            },
        },
    },

    divider: {},
}));

export type States = 'hovered' | 'active' | 'activeAndHovered' | 'disabled';

export const tabsItemStyles = StyleSheet.create(theme => ({
    root: {
        ...({ activeColor: theme.colors.primary } as any),

        flex: 1,
        paddingVertical: theme.spacings['2'],
        paddingHorizontal: theme.spacings['4'],
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },

    contentsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    stateLayer: {
        compoundVariants: [
            {
                variant: 'primary',
                state: 'hovered',
                styles: {
                    backgroundColor: theme.colors.stateLayer.hover.onSurface,
                },
            },
            {
                variant: 'primary',
                state: 'hovered',
                styles: {
                    backgroundColor: theme.colors.stateLayer.hover.onSurface,
                },
            },
            {
                variant: 'primary',
                state: 'activeAndHovered',
                styles: {
                    backgroundColor: theme.colors.stateLayer.hover.primary,
                },
            },
            {
                variant: 'secondary',
                state: 'hovered',
                styles: {
                    backgroundColor: theme.colors.stateLayer.hover.onSurface,
                },
            },
            {
                variant: 'secondary',
                state: 'activeAndHovered',
                styles: {
                    backgroundColor: theme.colors.stateLayer.hover.onSurface,
                },
            },
        ],
    },
}));

export const tabsLabelStyles = StyleSheet.create(theme => ({
    label: {
        ...theme.typescale.titleSmall,
        color: theme.colors.onSurface,
    },

    icon: {
        color: theme.colors.onSurfaceVariant,
    },
}));

import { StyleSheet } from 'react-native-unistyles';

export const menuStyles = StyleSheet.create(theme => ({
    root: {
        paddingVertical: theme.spacings['2'],
        backgroundColor: theme.colors.surface,
        minWidth: 112,
        maxWidth: 280,
        borderRadius: theme.shapes.corner.small as unknown as number,
        display: 'flex',
        flexDirection: 'column',
    },
    backdrop: {
        opacity: 0,
    },
    container: {
        padding: 0,
        borderRadius: theme.shapes.corner.small,
    },
}));

export const menuItemStyles = StyleSheet.create(theme => ({
    root: {
        paddingVertical: theme.spacings['2'],
        flexDirection: 'row',
        alignItems: 'center',

        variants: {
            state: {
                disabled: {
                    opacity: 0.38,
                },
                hovered: {},
            },
            size: {
                default: {
                    paddingHorizontal: theme.spacings['4'],
                    height: 48,
                },

                dense: {
                    paddingLeft: theme.spacings['4'],
                    paddingRight: theme.spacings['2'],
                    height: 32,
                },
            },
        },
    },

    text: {
        flex: 1,
        color: theme.colors.onSurface,

        size: {
            default: {
                ...theme.typescale.bodyLarge,
            },

            dense: {
                ...theme.typescale.bodyMedium,
            },
        },
    },

    leftElement: {
        marginRight: theme.spacings['5'],
        marginLeft: theme.spacings['2'],
    },
    rightElement: {
        marginRight: theme.spacings['2'],
        marginLeft: theme.spacings['5'],
    },

    stateLayer: {
        variants: {
            state: {
                disabled: {
                    backgroundColor: 'transparent',
                },
                hovered: {
                    backgroundColor: theme.colors.stateLayer.hover.onSurface,
                },
            },
        },
    },
}));

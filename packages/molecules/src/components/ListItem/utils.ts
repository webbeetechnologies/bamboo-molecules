import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const listItemStylesDefault = StyleSheet.create(theme => ({
    root: {
        backgroundColor: theme.colors.surface,

        variants: {
            state: {
                disabled: {
                    opacity: 0.38,
                },
                hovered: {
                    backgroundColor: theme.colors.stateLayer.hover.primary,
                },

                selected: {
                    backgroundColor: theme.colors.surfaceVariant,
                },
            },
            variant: {
                default: {
                    paddingTop: theme.spacings['2'],
                    paddingBottom: theme.spacings['2'],
                    paddingLeft: theme.spacings['4'],
                    paddingRight: theme.spacings['6'],
                },
                menuItem: {
                    paddingVertical: theme.spacings['2'],
                    paddingHorizontal: theme.spacings['3'],
                    minHeight: 48,
                    justifyContent: 'center',
                },
            },
        },
    },

    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    content: {
        flex: 1,
        justifyContent: 'center',
    },

    leftElement: {
        marginRight: theme.spacings['3'],
        marginLeft: theme.spacings._1,
    },
    rightElement: {
        marginRight: theme.spacings._1,
        marginLeft: theme.spacings['3'],
    },
}));

const listItemTitleStylesDefault = StyleSheet.create(theme => ({
    root: {
        color: theme.colors.onSurface,
        ...theme.typescale.bodyLarge,

        variants: {
            variant: {
                menuItem: {
                    ...theme.typescale.labelLarge,
                },
            },
            state: {
                hovered: {},
                disabled: {},
            },
        },
    },
}));

const listItemDescriptionStylesDefault = StyleSheet.create(theme => ({
    root: {
        color: theme.colors.onSurfaceVariant,
        ...theme.typescale.bodyMedium,

        variants: {
            variant: {
                menuItem: {
                    ...theme.typescale.bodySmall,
                },
            },
            state: {
                disabled: {},
                hovered: {},
            },
        },
    },
}));

registerComponentsStyles({
    ListItem: listItemStylesDefault,
    ListItem_Title: listItemTitleStylesDefault,
    ListItem_Description: listItemDescriptionStylesDefault,
});

export const listItemStyles = getRegisteredMoleculesComponentStyles('ListItem');
export const listItemTitleStyles = getRegisteredMoleculesComponentStyles('ListItem_Title');
export const listItemDescriptionStyles =
    getRegisteredMoleculesComponentStyles('ListItem_Description');

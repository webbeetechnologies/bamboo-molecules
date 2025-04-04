import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const drawerStylesDefault = StyleSheet.create(theme => ({
    root: {
        borderTopRightRadius: theme.shapes.corner.large,
        borderBottomRightRadius: theme.shapes.corner.large,
        overflow: 'hidden',
        backgroundColor: theme.colors.surface,
        minWidth: 360,
        flexGrow: 1,
    },
}));

const drawerContentStylesDefault = StyleSheet.create(theme => ({
    root: {
        paddingHorizontal: theme.spacings['3'],
        flex: 1,
    },
}));

const drawerHeaderStylesDefault = StyleSheet.create({
    root: {},
});

const drawerFooterStylesDefault = StyleSheet.create({
    root: {},
});

const drawerItemStylesDefault = StyleSheet.create(theme => ({
    root: {
        minHeight: 56,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: theme.shapes.corner.full,
        paddingLeft: theme.spacings['4'],
        paddingRight: theme.spacings['6'],

        leftElementColor: theme.colors.onSurfaceVariant,
        rightElementColor: theme.colors.onSurfaceVariant,

        variants: {
            state: {
                activeAndHovered: {
                    backgroundColor: theme.colors.secondaryContainer,
                    leftElementColor: theme.colors.onSecondaryContainer,
                },
                active: {
                    backgroundColor: theme.colors.secondaryContainer,
                    leftElementColor: theme.colors.onSecondaryContainer,
                },
                hovered: {
                    backgroundColor: theme.colors.stateLayer.hover.onSurface,
                },
            },
        },
    },

    leftElement: {
        marginRight: theme.spacings['3'],
    },
    rightElement: {
        marginLeft: theme.spacings['3'],
    },

    content: {
        flexDirection: 'row',
        flex: 1,
    },

    label: {
        color: theme.colors.onSurfaceVariant,
        lineHeight: theme.typescale.labelLarge.lineHeight,
        fontSize: theme.typescale.labelLarge.fontSize,
        fontWeight: theme.typescale.labelLarge.fontWeight,
        flexGrow: 1,

        variants: {
            state: {
                activeAndHovered: {
                    color: theme.colors.onSecondaryContainer,
                },
                active: {
                    color: theme.colors.onSecondaryContainer,
                },
            },
        },
    },
}));

const drawerItemGroupStylesDefault = StyleSheet.create(theme => ({
    root: {
        marginBottom: theme.spacings['1'],
    },
    title: {
        color: theme.colors.onSurfaceVariant,
        lineHeight: theme.typescale.titleSmall.lineHeight,
        fontSize: theme.typescale.titleSmall.fontSize,
        fontWeight: theme.typescale.titleSmall.fontWeight,
        marginVertical: theme.spacings['4'],
        marginHorizontal: theme.spacings['3'],
    },

    divider: {
        marginTop: theme.spacings['1'],
    },
}));

registerComponentsStyles({
    drawerStyles: drawerStylesDefault,
    drawerContentStyles: drawerContentStylesDefault,
    drawerHeaderStyles: drawerHeaderStylesDefault,
    drawerFooterStyles: drawerFooterStylesDefault,
    drawerItemStyles: drawerItemStylesDefault,
    drawerItemGroupStyles: drawerItemGroupStylesDefault,
});

export const drawerStyles = getRegisteredMoleculesComponentStyles('drawerStyles');
export const drawerContentStyles = getRegisteredMoleculesComponentStyles('drawerContentStyles');
export const drawerHeaderStyles = getRegisteredMoleculesComponentStyles('drawerHeaderStyles');
export const drawerFooterStyles = getRegisteredMoleculesComponentStyles('drawerFooterStyles');
export const drawerItemStyles = getRegisteredMoleculesComponentStyles('drawerItemStyles');
export const drawerItemGroupStyles = getRegisteredMoleculesComponentStyles('drawerItemGroupStyles');

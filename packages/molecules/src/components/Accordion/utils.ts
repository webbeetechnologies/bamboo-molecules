import { StyleSheet } from 'react-native-unistyles';

export const accordionStyles = StyleSheet.create({
    root: {},
});

export const accordionItemStyles = StyleSheet.create({
    root: {},
});

export const accordionItemHeaderStyles = StyleSheet.create(theme => ({
    root: {
        minHeight: 56,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: theme.shapes.corner.full,
        paddingLeft: theme.spacings['4'],
        paddingRight: theme.spacings['6'],
        elementColor: theme.colors.onSurfaceVariant,
        state: {
            expandedAndHovered: {
                backgroundColor: theme.colors.stateLayer.hover.onSurface,
            },
            expanded: {},
            hovered: {
                backgroundColor: theme.colors.stateLayer.hover.onSurface,
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
        color: theme.colors.onSurfaceVariant,
        ...theme.typescale.titleMedium,
    },
}));

export const accordionItemContentStyles = StyleSheet.create(theme => ({
    root: {
        paddingLeft: theme.spacings['6'],
    },
}));

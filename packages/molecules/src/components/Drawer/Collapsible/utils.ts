import { StyleSheet } from 'react-native-unistyles';

export const drawerCollapsibleStyles = StyleSheet.create({
    root: {},
});

export const drawerCollapsibleItemStyles = StyleSheet.create({
    root: {},
});

export const drawerCollapsibleItemHeaderStyles = StyleSheet.create(theme => ({
    content: {
        color: theme.colors.onSurfaceVariant,
        ...theme.typescale.labelLarge,

        variants: {
            state: {
                active: {
                    backgroundColor: theme.colors.stateLayer.hover.onSurface,
                },
            },
        },
    },
    leftElement: {},
    rightElement: {},
}));

export const drawerCollapsibleItemContentStyles = StyleSheet.create({
    root: {},
});

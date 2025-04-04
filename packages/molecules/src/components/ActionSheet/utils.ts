import { StyleSheet } from 'react-native-unistyles';

export const actionSheetStyles = StyleSheet.create(theme => ({
    root: {
        // @ts-ignore // TODO - fix this issue
        overlayColor: theme.colors.scrim,
    },
    containerStyle: {
        backgroundColor: theme.colors.surface,
        paddingTop: theme.spacings['1'],
    },
    indicatorStyle: {
        backgroundColor: theme.colors.onSurfaceVariant,
        opacity: 0.4,
    },
}));

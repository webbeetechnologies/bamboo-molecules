import { StyleSheet } from 'react-native-unistyles';

export const dialogStyles = StyleSheet.create(theme => ({
    root: {
        spacing: theme.spacings['6'],
        justifyContent: 'flex-start',
        borderRadius: theme.shapes.corner.extraLarge,
        backgroundColor: theme.colors.surface,
    },
}));

export const dialogTitleStyles = StyleSheet.create(theme => ({
    root: {
        marginHorizontal: theme.spacings['6'],
        marginVertical: theme.spacings['3'],
        color: theme.colors.onSurface,
        ...theme.typescale.headlineSmall,
    },
}));

export const dialogScrollAreaStyles = StyleSheet.create(theme => ({
    root: {
        flexGrow: 1,
        flexShrink: 1,
        marginBottom: theme.spacings['6'],
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.surfaceVariant,
    },
}));

export const dialogIconStyles = StyleSheet.create(theme => ({
    root: {
        color: theme.colors.secondary,
        paddingTop: theme.spacings['6'],
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export const dialogContentStyles = StyleSheet.create(theme => ({
    root: {
        paddingBottom: theme.spacings['6'],
        paddingHorizontal: theme.spacings['6'],
        flex: 1,
    },
}));

export const dialogActionsStyles = StyleSheet.create(theme => ({
    root: {
        ...({ spacing: theme.spacings['2'] } as any),
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: theme.spacings['6'],
        paddingHorizontal: theme.spacings['6'],
    },
}));

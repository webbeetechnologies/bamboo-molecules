import { StyleSheet } from 'react-native-unistyles';

export const appbarBaseStyles = StyleSheet.create(theme => ({
    root: {
        paddingHorizontal: theme.spacings['4'],
        backgroundColor: theme.colors.surface,
        flex: 1,
        minHeight: 64,
    },

    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

export const appbarCenterAlignedStyles = StyleSheet.create({
    root: { minHeight: 64 },
});

export const appbarSmallStyles = StyleSheet.create({
    root: { minHeight: 64 },
});

export const appbarMediumStyles = StyleSheet.create(theme => ({
    root: {
        paddingHorizontal: theme.spacings['4'],
        paddingVertical: theme.spacings['5'],
        minHeight: 112,
    },

    innerContainer: {
        marginBottom: theme.spacings['6'],
    },
}));

export const appbarLargeStyles = StyleSheet.create(theme => ({
    root: {
        paddingHorizontal: theme.spacings['4'],
        paddingVertical: theme.spacings['5'],
        minHeight: 152,
    },

    innerContainer: {
        marginBottom: theme.spacings['6'],
    },
}));

export const appbarTitle = StyleSheet.create(theme => ({
    root: {
        display: 'flex',
        flex: 1,
        color: theme.colors.onSurface,

        variants: {
            size: {
                sm: {
                    lineHeight: theme.typescale.titleLarge.lineHeight,
                    fontSize: theme.typescale.titleLarge.fontSize,
                    fontWeight: theme.typescale.titleLarge.fontWeight,
                },
                md: {
                    lineHeight: theme.typescale.headlineSmall.lineHeight,
                    fontSize: theme.typescale.headlineSmall.fontSize,
                    fontWeight: theme.typescale.headlineSmall.fontWeight,
                },
                lg: {
                    lineHeight: theme.typescale.headlineMedium.lineHeight,
                    fontSize: theme.typescale.headlineMedium.fontSize,
                    fontWeight: theme.typescale.headlineMedium.fontWeight,
                },
            },
        },
    },
}));

export const appbarRight = StyleSheet.create(theme => ({
    root: {
        spacing: theme.spacings['6'],
        flexDirection: 'row',
        alignItems: 'center',
    },
}));

export const appbarLeft = StyleSheet.create(theme => ({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: theme.spacings['6'],

        variants: {
            size: {
                small: {
                    marginRight: theme.spacings['4'],
                },
                'center-aligned': {},
                medium: {},
                large: {},
            },
        },
    },
}));

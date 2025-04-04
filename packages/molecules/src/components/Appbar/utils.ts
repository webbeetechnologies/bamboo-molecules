import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const appbarBaseStylesDefault = StyleSheet.create(theme => ({
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

const appbarCenterAlignedStylesDefault = StyleSheet.create({
    root: { minHeight: 64 },
});

const appbarSmallStylesDefault = StyleSheet.create({
    root: { minHeight: 64 },
});

const appbarMediumStylesDefault = StyleSheet.create(theme => ({
    root: {
        paddingHorizontal: theme.spacings['4'],
        paddingVertical: theme.spacings['5'],
        minHeight: 112,
    },

    innerContainer: {
        marginBottom: theme.spacings['6'],
    },
}));

const appbarLargeStylesDefault = StyleSheet.create(theme => ({
    root: {
        paddingHorizontal: theme.spacings['4'],
        paddingVertical: theme.spacings['5'],
        minHeight: 152,
    },

    innerContainer: {
        marginBottom: theme.spacings['6'],
    },
}));

const appbarTitleDefault = StyleSheet.create(theme => ({
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

const appbarRightDefault = StyleSheet.create(theme => ({
    root: {
        spacing: theme.spacings['6'],
        flexDirection: 'row',
        alignItems: 'center',
    },
}));

const appbarLeftDefault = StyleSheet.create(theme => ({
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

registerComponentsStyles({
    appbarBaseStyles: appbarBaseStylesDefault,
    appbarCenterAlignedStyles: appbarCenterAlignedStylesDefault,
    appbarSmallStyles: appbarSmallStylesDefault,
    appbarMediumStyles: appbarMediumStylesDefault,
    appbarLargeStyles: appbarLargeStylesDefault,
    appbarTitle: appbarTitleDefault,
    appbarRight: appbarRightDefault,
    appbarLeft: appbarLeftDefault,
});

export const appbarBaseStyles = getRegisteredMoleculesComponentStyles('appbarBaseStyles');
export const appbarCenterAlignedStyles = getRegisteredMoleculesComponentStyles(
    'appbarCenterAlignedStyles',
);
export const appbarSmallStyles = getRegisteredMoleculesComponentStyles('appbarSmallStyles');
export const appbarMediumStyles = getRegisteredMoleculesComponentStyles('appbarMediumStyles');
export const appbarLargeStyles = getRegisteredMoleculesComponentStyles('appbarLargeStyles');
export const appbarTitle = getRegisteredMoleculesComponentStyles('appbarTitle');
export const appbarRight = getRegisteredMoleculesComponentStyles('appbarRight');
export const appbarLeft = getRegisteredMoleculesComponentStyles('appbarLeft');

import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const avatarStylesDefault = StyleSheet.create(theme => ({
    root: {
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: '100%',
    },
    icon: {
        color: theme.colors.onPrimary,
    },
    label: {
        fontSize: theme.typescale.titleMedium.fontSize,
        fontWeight: theme.typescale.titleMedium.fontWeight,
        lineHeight: theme.typescale.titleMedium.lineHeight,
        textTransform: 'capitalize',
        color: '#ffffff',
    },
}));

registerComponentsStyles({
    Avatar: avatarStylesDefault,
});

export const avatarStyles = getRegisteredMoleculesComponentStyles('Avatar');

import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const popoverStylesDefault = StyleSheet.create(theme => ({
    initialTransition: { opacity: 0 },
    animateTransition: { opacity: 1, transition: { duration: 150 } },
    exitTransition: { opacity: 0, scale: 0.95, transition: { duration: 100 } },
    contentText: {
        color: theme.colors.onSurface,
    },
    content: {
        backgroundColor: 'colors.surface',
        padding: theme.spacings['2'],
        borderRadius: theme.shapes.corner.small,
    },
    arrow: {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.surface,
        elevation: 1,
    },
}));

registerComponentsStyles({
    Popover: popoverStylesDefault,
});

export const defaultStyles = getRegisteredMoleculesComponentStyles('Popover');

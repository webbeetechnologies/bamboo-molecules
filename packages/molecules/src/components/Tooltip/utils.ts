import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const tooltipStylesDefault = StyleSheet.create(theme => ({
    content: {
        backgroundColor: theme.colors.onSurfaceVariant,
        borderRadius: theme.shapes.corner.extraSmall,
        padding: theme.spacings['2'],
    },
    contentText: {
        color: theme.colors.surface,
    },
}));

registerComponentsStyles({
    tooltipStyles: tooltipStylesDefault,
});

export const tooltipStyles = getRegisteredMoleculesComponentStyles('tooltipStyles');

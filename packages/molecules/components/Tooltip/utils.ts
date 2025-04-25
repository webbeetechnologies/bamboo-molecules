import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

const tooltipStylesDefault = StyleSheet.create(theme => ({
    content: {
        backgroundColor: theme.colors.surfaceVariant,
        borderRadius: theme.shapes.corner.extraSmall,
        padding: theme.spacings['2'],
    },
    contentText: {
        color: theme.colors.onSurface,
    },
}));

registerComponentsStyles({
    Tooltip: tooltipStylesDefault,
});

export const tooltipStyles = getRegisteredMoleculesComponentStyles('Tooltip');

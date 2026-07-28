import { StyleSheet } from 'react-native-unistyles';

import {
    getRegisteredComponentStylesWithFallback,
    getRegisteredComponentUtilsMergedWithFallback,
} from '../../core';

export type TooltipDefaultProps = {
    inverted: boolean;
};

const tooltipDefaultPropsDefault: TooltipDefaultProps = {
    inverted: true,
};

const tooltipStylesDefault = StyleSheet.create(theme => ({
    content: {
        backgroundColor: theme.colors.surfaceVariant,
        borderRadius: theme.shapes.corner.extraSmall,
        padding: theme.spacings['2'],
    },
    contentText: {
        color: theme.colors.onSurface,
        ...theme.typescale.bodySmall,
    },
}));

export const tooltipStyles = getRegisteredComponentStylesWithFallback(
    'Tooltip',
    tooltipStylesDefault,
);

export const tooltipDefaultProps: TooltipDefaultProps =
    getRegisteredComponentUtilsMergedWithFallback(
        'Tooltip',
        tooltipDefaultPropsDefault,
        'tooltipDefaultProps',
    );

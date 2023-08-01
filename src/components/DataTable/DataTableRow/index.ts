import type { ComponentStylePropWithResolvers } from '../../../types';
import type { ViewStyle } from 'react-native';

export * from './DataTableRow';

export const dataTableRowStyles: ComponentStylePropWithResolvers<
    ViewStyle,
    'selected' | 'hovered' | 'selected_hovered'
> = {
    padding: 'spacings.1',
    width: '100%',

    sizes: {
        sm: {
            height: 40,
        },
        md: {
            height: 80,
        },
        lg: {
            height: 120,
        },
        xl: {
            height: 160,
        },
    },
    states: {
        hovered: {
            backgroundColor: 'colors.stateLayer.hover.primary',
        },
        selected: {
            backgroundColor: 'colors.stateLayer.hover.onPrimaryContainer',
        },
        selected_hovered: {
            backgroundColor: 'colors.stateLayer.hover.onPrimaryContainer',
        },
    },
};

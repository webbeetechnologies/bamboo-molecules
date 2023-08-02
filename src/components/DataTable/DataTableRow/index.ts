import type { ComponentStylePropWithResolvers } from '../../../types';
import type { ViewStyle } from 'react-native';

export * from './DataTableRow';

export const dataTableRowStyles: ComponentStylePropWithResolvers<
    ViewStyle,
    'selected' | 'hovered' | 'selected_hovered'
> = {
    width: '100%',

    sizes: {
        sm: {
            height: 40,
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

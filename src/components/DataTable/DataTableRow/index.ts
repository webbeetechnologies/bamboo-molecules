import type { ComponentStylePropWithResolvers } from '../../../types';
import type { ViewStyle } from 'react-native';

export * from './DataTableRow';

export const dataTableRowStyles: ComponentStylePropWithResolvers<
    ViewStyle,
    'selected' | 'hovered' | 'selected_hovered'
> = {
    padding: 'spacings.1',
    states: {
        selected: {},
        hovered: {
            backgroundColor: 'colors.stateLayer.hover.primary',
        },
        selected_hovered: {},
    },
};

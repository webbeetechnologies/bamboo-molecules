import type { ComponentStylePropWithResolvers } from '../../../types';
import type { ViewStyle } from 'react-native';

export * from './DataTableRow';

export const dataTableRowStyles: ComponentStylePropWithResolvers<
    ViewStyle,
    'disabled' | 'selected' | 'hovered' | 'selected_hovered'
> = {
    states: {
        disabled: {},
        selected: {},
        hovered: {},
        selected_hovered: {},
    },
};

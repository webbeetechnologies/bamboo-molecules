import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    grid: ViewStyle;
};

export const gridStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
};

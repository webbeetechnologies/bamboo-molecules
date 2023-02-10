import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from 'src/types';

type CustomProps = {
    grid: ViewStyle;
    row: ViewStyle;
};

export const gridStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    grid: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: '100%',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
};

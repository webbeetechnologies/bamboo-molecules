import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    popoverContainer: ViewStyle;
};

export const dropdownListStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    paddingHorizontal: 'spacings.3',

    popoverContainer: {
        minWidth: 112,
    },
};

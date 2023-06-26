import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    container: ViewStyle;
    searchInputContainer: ViewStyle;
};

export const optionListStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    container: {
        flex: 1,
    },
    searchInputContainer: {
        backgroundColor: 'colors.surface',
    },
};

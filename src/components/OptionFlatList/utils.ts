import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    container: ViewStyle;
    searchInputContainer: ViewStyle;
};

export const optionFlatListStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    container: {
        flex: 1,
    },
    searchInputContainer: {
        marginBottom: 'spacings.2',
    },
};

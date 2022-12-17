import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    popoverContainer: ViewStyle;
};

export const dropdownListStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    popoverContainer: {
        minWidth: 112,
        backgroundColor: 'colors.surface',
        borderRadius: 'shapes.corner.extraSmall' as unknown as number,
    },
};

import type { ComponentStylePropWithVariants } from '../../types';
import type { ViewStyle } from 'react-native';

type CustomProps = {
    containerStyle?: ViewStyle;
    indicatorStyle?: ViewStyle;
    overlayColor?: string;
};

export const actionSheetStyles: ComponentStylePropWithVariants<{}, '', CustomProps> = {
    containerStyle: {
        backgroundColor: 'colors.surface',
    },
    indicatorStyle: {
        backgroundColor: 'colors.onSurfaceVariant',
    },
    overlayColor: 'colors.scrim',
};

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
        paddingTop: 'spacings.1',
    },
    indicatorStyle: {
        backgroundColor: 'colors.onSurfaceVariant',
        opacity: 0.4,
    },
    overlayColor: 'colors.scrim',
};

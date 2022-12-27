import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    content?: ViewStyle;
    contentText?: TextStyle;
};

export const tooltipStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    content: {
        backgroundColor: 'colors.onSurfaceVariant',
        borderRadius: 'shapes.corner.extraSmall' as unknown as number,
        padding: 'spacings.2',
    },
    contentText: {
        color: 'colors.surface',
    },
};

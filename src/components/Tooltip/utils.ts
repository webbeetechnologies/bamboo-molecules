import type { ComponentStylePropWithVariants } from '../../types';
import type { TextStyle, ViewStyle } from 'react-native';

type CustomProps = {
    contentText?: TextStyle;
};

export const tooltipStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    backgroundColor: 'colors.onSurfaceVariant',
    borderRadius: 'shapes.corner.extraSmall' as unknown as number,

    contentText: {
        color: 'colors.surface',
    },
};

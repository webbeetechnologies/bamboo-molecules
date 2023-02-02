import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

export const badgeStyles: ComponentStylePropWithVariants<ViewStyle, '', { label?: TextStyle }> = {
    backgroundColor: 'colors.error',
    borderRadius: 'shapes.corner.full' as unknown as number,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 'spacings.1',

    label: {
        color: 'colors.onError',
        fontSize: 'typescale.labelSmall.fontSize' as unknown as number,
        fontFamily: 'typescale.labelSmall.fontFamily',
        lineHeight: 'typescale.labelSmall.lineHeight' as unknown as number,
        fontWeight: 'typescale.labelSmall.fontWeight' as unknown as TextStyle['fontWeight'],
    },

    sizes: {
        sm: {
            width: 6,
            height: 6,
            paddingHorizontal: 'spacings.0',
        },
        md: {
            minWidth: 16,
            minHeight: 16,
        },
    },
};

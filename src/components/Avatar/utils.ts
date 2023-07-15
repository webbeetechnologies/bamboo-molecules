import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    size?: number | string;

    image?: ImageStyle;
    icon?: TextStyle;
    label?: TextStyle;
};

export const avatarStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    backgroundColor: 'colors.primary',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',

    size: 32,

    image: {
        width: '100%',
        height: '100%',
    },
    icon: {
        color: 'colors.onPrimary',
    },
    label: {
        fontSize: 'typescale.titleMedium.fontSize' as unknown as number,
        fontWeight: 'typescale.titleMedium.fontWeight' as unknown as TextStyle['fontWeight'],
        lineHeight: 'typescale.titleMedium.lineHeight' as unknown as number,
        textTransform: 'capitalize',
        color: '#ffffff',
    },
};

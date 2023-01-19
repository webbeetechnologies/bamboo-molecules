import type { ComponentStylePropWithVariants } from '../../types';
import type { TextStyle } from 'react-native';

type States = 'disabled' | 'hovered';

export const linkStyles: ComponentStylePropWithVariants<TextStyle, States> = {
    // @ts-ignore
    cursor: 'pointer',
    color: 'colors.primary',
    textDecorationLine: 'underline',
    fontSize: 'typescale.bodyMedium.fontSize' as unknown as number,
    fontWeight: 'typescale.bodyMedium.fontWeight' as unknown as TextStyle['fontWeight'],
    lineHeight: 'typescale.bodyMedium.lineHeight' as unknown as number,

    states: {
        hovered: {
            color: 'colors.onPrimaryContainer',
        },
    },
};

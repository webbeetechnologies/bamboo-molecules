import type { ComponentStylePropWithVariants } from '../../types';
import type { TextStyle } from 'react-native';

type States = 'disabled' | 'hovered';

export const linkStyles: ComponentStylePropWithVariants<TextStyle, States> = {
    // @ts-ignore
    cursor: 'pointer',
    color: 'colors.primary',
    fontSize: 'typescale.labelLarge.fontSize' as unknown as number,
    fontWeight: 'typescale.labelLarge.fontWeight' as unknown as TextStyle['fontWeight'],
    lineHeight: 'typescale.labelLarge.lineHeight' as unknown as number,

    states: {
        disabled: {
            color: 'colors.onSurfaceDisabled',
            opacity: 0.38,
            // @ts-ignore
            cursor: 'default',
        },
        hovered: {
            textDecorationLine: 'underline',
        },
    },
};

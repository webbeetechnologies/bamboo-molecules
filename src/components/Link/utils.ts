import type { ComponentStylePropWithVariants } from '../../types';
import type { TextStyle } from 'react-native';
import { getCursorStyle } from '../../utils';

type States = 'disabled' | 'hovered';

export const linkStyles: ComponentStylePropWithVariants<TextStyle, States> = {
    ...getCursorStyle('pointer'),
    color: 'colors.primary',
    fontSize: 'typescale.labelLarge.fontSize' as unknown as number,
    fontWeight: 'typescale.labelLarge.fontWeight' as unknown as TextStyle['fontWeight'],
    lineHeight: 'typescale.labelLarge.lineHeight' as unknown as number,

    states: {
        disabled: {
            color: 'colors.onSurfaceDisabled',
            opacity: 0.38,
            ...getCursorStyle('pointer'),
        },
        hovered: {
            textDecorationLine: 'underline',
        },
    },
};

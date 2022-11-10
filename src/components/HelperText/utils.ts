import type { TextStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = '';
type CustomProps = {
    animationScale?: string;
    fontSize?: string | undefined;
};

export const defaultStyles: ComponentStylePropWithVariants<
    Omit<TextStyle, 'fontSize'>,
    States,
    CustomProps
> = {
    animationScale: 'animation.scale',

    fontSize: 'typescale.bodySmall.fontSize',
    paddingVertical: 'spacings.1',
    paddingHorizontal: 'spacings.4',

    variants: {
        error: {
            color: 'colors.error',
        },
        info: {
            color: 'colors.onSurfaceVariant',
        },
    },
};

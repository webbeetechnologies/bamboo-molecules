import type { ComponentStylePropWithVariants } from '../../types';
import type { ViewStyle } from 'react-native';

type CustomProps = {};

export const inputAddonStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'colors.surfaceVariant',
    borderColor: 'colors.outline',
    borderWidth: 1,
    borderRadius: 'spacings.1' as unknown as ViewStyle['borderRadius'],
    paddingHorizontal: 'spacings.2',

    variants: {
        left: {
            borderRightWidth: 0,
        },

        right: {
            borderLeftWidth: 0,
        },
    },
};

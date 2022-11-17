import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    container: ViewStyle;
    searchInputContainer: ViewStyle;
    emptyText: TextStyle;
};

export const optionListStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    container: {},
    searchInputContainer: {
        marginBottom: 'spacings.2',
    },
    emptyText: {
        fontSize: 'typescale.bodyMedium.fontSize' as unknown as number,
        lineHeight: 'typescale.bodyMedium.lineHeight' as unknown as number,
        fontWeight: 'typescale.bodyMedium.fontWeight' as unknown as TextStyle['fontWeight'],
    },
};

import type { TextStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../../../types';

type States = '';

type CustomProps = {
    selectColor?: string;
    primaryColor?: string;
    roundness?: string;
    headerBackgroundColor?: string;

    month?: Record<string, any>;
    yearPicker?: Record<string, any>;
};

export const defaultStyles: ComponentStylePropWithVariants<TextStyle, States, CustomProps> = {
    selectColor: 'colors.primary',
    primaryColor: 'colors.primary',
    roundness: 'roundness.1',
    headerBackgroundColor: 'colors.surface',

    month: {
        monthLabel: {
            fontSize: 'typescale.bodyMedium.fontSize',
            opacity: 0.7,
        },
        yearButton: {
            alignSelf: 'flex-start',
            marginLeft: 6,
        },
        yearButtonInner: {
            paddingLeft: 'spacings.4',
            flexDirection: 'row',
            alignItems: 'center',
        },
    },

    yearPicker: {
        backgroundColor: 'colors.surface',

        year: {
            flex: 1,
            marginLeft: 16,
            marginRight: 16,
            justifyContent: 'center',
        },
        selectedYear: { color: '#fff' },
        yearButton: {
            borderRadius: 46 / 2,
            overflow: 'hidden',
        },
        yearInner: {
            borderRadius: 46 / 2,
            height: 46,
            alignItems: 'center',
            justifyContent: 'center',
        },
        yearLabel: {
            fontSize: 16,
        },
    },
};

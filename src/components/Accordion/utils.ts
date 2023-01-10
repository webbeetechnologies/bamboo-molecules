import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

export const accordionStyles: ComponentStylePropWithVariants<ViewStyle> = {};

export const accordionItemStyles: ComponentStylePropWithVariants<ViewStyle> = {};

type AccordionItemHeaderStates = 'expandedAndHovered' | 'expanded' | 'hovered';
type AccordionItemHeaderCustomProps = {
    elementColor?: string;
    leftElement?: ViewStyle;
    rightElement?: ViewStyle;
    content?: TextStyle;
};

export const accordionItemHeaderStyles: ComponentStylePropWithVariants<
    ViewStyle,
    AccordionItemHeaderStates,
    AccordionItemHeaderCustomProps
> = {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 'shapes.corner.full' as unknown as number,
    paddingLeft: 'spacings.4',
    paddingRight: 'spacings.6',
    elementColor: 'colors.onSurfaceVariant',

    leftElement: {
        marginRight: 'spacings.3',
    },
    rightElement: {
        marginLeft: 'spacings.3',
    },
    content: {
        color: 'colors.onSurfaceVariant',
        lineHeight: 'typescale.titleMedium.lineHeight' as unknown as number,
        fontSize: 'typescale.titleMedium.fontSize' as unknown as number,
        fontWeight: 'typescale.titleMedium.fontWeight' as unknown as TextStyle['fontWeight'],
    },

    states: {
        expandedAndHovered: {
            backgroundColor: 'colors.stateLayer.hover.onSurface',
        },
        expanded: {},
        hovered: {
            backgroundColor: 'colors.stateLayer.hover.onSurface',
        },
    },
};

export const accordionItemContentStyles: ComponentStylePropWithVariants<ViewStyle> = {
    paddingLeft: 'spacings.6',
};

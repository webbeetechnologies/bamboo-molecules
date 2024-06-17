import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    itemsContainer?: ViewStyle;
    indicator?: ViewStyle;
    divider?: ViewStyle;
    activeColor?: string;
};

export const tabsStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    activeColor: 'colors.primary',

    itemsContainer: {
        flexDirection: 'row',
        position: 'relative',
        flex: 1,
    },

    indicator: {
        position: 'absolute',
        bottom: 0,
    },

    divider: {},

    variants: {
        primary: {
            indicator: {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
            },
        },
        secondary: {
            indicator: {
                height: 2,
            },
        },
    },
};

type TabsItemCustomProps = {
    contentsContainer?: ViewStyle;
    activeColor?: string;
    stateLayer?: ViewStyle;
};

type States = 'hovered' | 'active' | 'activeAndHovered' | 'disabled';

export const tabsItemStyles: ComponentStylePropWithVariants<
    ViewStyle,
    States,
    TabsItemCustomProps
> = {
    activeColor: 'colors.primary',

    flex: 1,
    paddingVertical: 'spacings.2',
    paddingHorizontal: 'spacings.4',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,

    contentsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    variants: {
        primary: {
            states: {
                hovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onSurface',
                    },
                },

                activeAndHovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.primary',
                    },
                },
            },
        },
        secondary: {
            states: {
                hovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onSurface',
                    },
                },

                activeAndHovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onSurface',
                    },
                },
            },
        },
    },
};

type TabsLabelCustomProps = {
    label?: TextStyle;
    icon?: TextStyle;
};

export const tabsLabelStyles: ComponentStylePropWithVariants<{}, States, TabsLabelCustomProps> = {
    label: {
        fontSize: 'typescale.titleSmall.fontSize' as unknown as number,
        fontWeight: 'typescale.titleSmall.fontWeight' as unknown as TextStyle['fontWeight'],
        lineHeight: 'typescale.titleSmall.lineHeight' as unknown as number,
        color: 'colors.onSurface',
    },

    icon: {
        color: 'colors.onSurfaceVariant',
    },
};

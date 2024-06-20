import { FC, memo, useMemo } from 'react';
import type { TextStyle, TextProps } from 'react-native';
import type { IconType, IconProps } from '../Icon';
import { useComponentStyles, useMolecules } from '../../hooks';

const DEFAULT_ICON_SIZE = 24;

export type TabLabelProps = {
    /**
     * label of the tab
     * */
    label?: string;
    labelStyle?: TextStyle;
    labelProps?: Omit<TextProps, 'children' | 'style'>;
    /**
     * icon properties
     * */
    iconName?: string;
    iconType?: IconType;
    iconProps?: Omit<IconProps, 'name' | 'type'>;
    iconStyle?: TextStyle;

    activeColor?: string;

    active: boolean;
    hovered: boolean;

    variant: 'primary' | 'secondary';
};

const TabLabel = memo((props: TabLabelProps) => {
    const { Icon, Text } = useMolecules();
    const {
        activeColor: activeColorProp,
        iconName,
        iconStyle: iconStyleProp,
        iconType,
        iconProps,
        labelStyle: labelStyleProp,
        labelProps,
        label,
        variant,
        hovered,
        active,
    } = props;

    const componentStyles = useComponentStyles(
        'Tabs_Label',
        [
            {
                icon: iconStyleProp,
                ...(activeColorProp ? { activeColor: activeColorProp } : {}),
                label: labelStyleProp || {},
            },
        ],
        {
            variant,
            states: {
                activeAndHovered: !!active && !!hovered,
                hovered,
                active,
            },
        },
    );

    const { labelStyle, iconStyle } = useMemo(() => {
        const { activeColor, label: _labelStyle, icon } = componentStyles;

        const color = active && !!activeColor ? { color: activeColor } : null;

        return {
            labelStyle: [_labelStyle, color],
            iconStyle: [icon, color],
        };
    }, [active, componentStyles]);

    return (
        <>
            {iconName && (
                <Icon
                    style={iconStyle}
                    name={iconName}
                    type={iconType}
                    size={DEFAULT_ICON_SIZE}
                    {...iconProps}
                />
            )}
            <Text style={labelStyle} numberOfLines={1} {...labelProps}>
                {label}
            </Text>
        </>
    );
});

TabLabel.displayName = 'TabLabel';

export default TabLabel as unknown as FC<Omit<TabLabelProps, 'active' | 'hovered' | 'variant'>>;

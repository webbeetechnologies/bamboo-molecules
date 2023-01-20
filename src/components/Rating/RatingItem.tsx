import { forwardRef, memo, useCallback, useMemo } from 'react';
import { ViewStyle, Pressable } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { IconProps, IconType } from '../Icon';

export type Props = IconProps & {
    index: number;
    value: number;
    onChange: (val: number) => void;
    activeIconName: string;
    activeIconType: IconType;
    disabled?: boolean;
    readonly?: boolean;
    iconContainerStyle?: ViewStyle;
    activeColor?: string;
    color?: string;
    showTooltips?: boolean;
};

const RatingItem = (
    {
        style,
        disabled = false,
        readonly = false,
        iconContainerStyle,
        value,
        index,
        onChange,
        name,
        type,
        activeIconName,
        activeIconType,
        activeColor = 'rgb(250, 175, 0)',
        color,
        showTooltips = true,
        ...rest
    }: Props,
    ref: any,
) => {
    const { Icon, Tooltip } = useMolecules();
    const active = value >= index;

    const componentStyles = useComponentStyles(
        'Rating_Item',
        [active ? { color: activeColor } : color ? { color } : {}, style],
        {
            states: {
                activeAndDisabled: active && disabled,
                activeAndReadonly: active && readonly,
                active,
                disabled,
                readonly,
            },
        },
    );

    const onPress = useCallback(() => {
        onChange(value === index ? 0 : index);
    }, [index, onChange, value]);

    const IconComponent = useMemo(
        () => (
            <Pressable
                ref={ref}
                style={iconContainerStyle}
                onPress={onPress}
                disabled={disabled || readonly}>
                <Icon
                    style={componentStyles}
                    {...rest}
                    name={value >= index ? activeIconName : name}
                    type={value >= index ? activeIconType : type}
                />
            </Pressable>
        ),
        [
            Icon,
            activeIconName,
            activeIconType,
            componentStyles,
            disabled,
            iconContainerStyle,
            index,
            name,
            onPress,
            readonly,
            ref,
            rest,
            type,
            value,
        ],
    );

    return showTooltips ? (
        <Tooltip>
            <Tooltip.Trigger>{IconComponent}</Tooltip.Trigger>
            <Tooltip.Content>{index}</Tooltip.Content>
        </Tooltip>
    ) : (
        IconComponent
    );
};

export default memo(forwardRef(RatingItem));

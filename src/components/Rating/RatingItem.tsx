import { forwardRef, memo, useCallback } from 'react';
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

    return (
        <Tooltip>
            <Tooltip.Trigger>
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
            </Tooltip.Trigger>
            <Tooltip.Content>{index}</Tooltip.Content>
        </Tooltip>
    );
};

export default memo(forwardRef(RatingItem));

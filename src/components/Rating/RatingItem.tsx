import { forwardRef, memo, useCallback } from 'react';
import { ViewStyle, Pressable } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { IconProps, IconType } from '../Icon';

export type Props = IconProps & {
    index: number;
    value: number;
    onChange: (val: number) => void;
    emptyIconName: string;
    emptyIconType: IconType;
    disabled?: boolean;
    readonly?: boolean;
    iconContainerStyle?: ViewStyle;
    color?: string;
    emptyColor?: string;
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
        emptyIconName,
        emptyIconType,
        color = 'rgb(250, 175, 0)',
        emptyColor,
        ...rest
    }: Props,
    ref: any,
) => {
    const { Icon, Tooltip } = useMolecules();
    const active = value >= index;

    const componentStyles = useComponentStyles(
        'Rating_Item',
        [style, active ? { color } : emptyColor ? { color: emptyColor } : {}],
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
                        name={value >= index ? name : emptyIconName}
                        type={value >= index ? type : emptyIconType}
                    />
                </Pressable>
            </Tooltip.Trigger>
            <Tooltip.Content>{index}</Tooltip.Content>
        </Tooltip>
    );
};

export default memo(forwardRef(RatingItem));

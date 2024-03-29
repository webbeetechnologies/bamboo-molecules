import { forwardRef, memo, useCallback, useMemo } from 'react';
import setColor from 'color';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { CheckBoxBaseProps } from './types';

export type Props = Omit<CheckBoxBaseProps, 'uncheckedColor' | 'value' | 'defaultValue'> & {
    value: boolean;
};

const CheckboxIOS = (
    {
        value: checked,
        indeterminate,
        disabled = false,
        size = 'sm',
        onChange: onChangeProp,
        color: colorProp,
        style,
        testID,
        ...rest
    }: Props,
    ref: any,
) => {
    const { TouchableRipple, Icon, View } = useMolecules();

    const componentStyles = useComponentStyles('Checkbox', style, {
        variant: 'ios',
        states: {
            disabled,
            checked: checked && !indeterminate,
        },
        size,
    });

    const { checkedColor, iconSize, rippleColor, rippleContainerStyles, iconContainerStyles } =
        useMemo(() => {
            const {
                color,
                iconSize: _iconSize,
                borderRadius,
                padding,
                ...checkboxStyles
            } = componentStyles;

            const _checkedColor = colorProp || color;

            return {
                checkedColor: _checkedColor,
                iconSize: _iconSize,
                rippleColor: setColor(_checkedColor).fade(0.32).rgb().string(),
                rippleContainerStyles: [
                    {
                        borderRadius,
                        padding,
                    },
                    checkboxStyles,
                ],
                iconContainerStyles: { opacity: indeterminate || checked ? 1 : 0 },
            };
        }, [checked, colorProp, componentStyles, indeterminate]);

    const onChange = useCallback(() => {
        onChangeProp?.(!checked);
    }, [checked, onChangeProp]);

    const icon = indeterminate ? 'minus' : 'check';

    return (
        <TouchableRipple
            {...rest}
            borderless
            rippleColor={rippleColor}
            onPress={onChange}
            disabled={disabled}
            accessibilityRole="checkbox"
            accessibilityState={{ disabled, checked }}
            accessibilityLiveRegion="polite"
            style={rippleContainerStyles}
            testID={testID}
            ref={ref}>
            <View style={iconContainerStyles}>
                <Icon
                    allowFontScaling={false}
                    type="material-community"
                    name={icon}
                    size={iconSize}
                    color={checkedColor}
                />
            </View>
        </TouchableRipple>
    );
};

export default memo(forwardRef(CheckboxIOS));

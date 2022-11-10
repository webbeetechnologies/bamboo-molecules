import { forwardRef, memo, useMemo } from 'react';
import setColor from 'color';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { CheckBoxBaseProps } from './types';

export type Props = Omit<CheckBoxBaseProps, 'uncheckedColor'> & {};

/**
 * Checkboxes allow the selection of multiple options from a set.
 * This component follows platform guidelines for iOS, but can be used
 * on any platform.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/checkbox-enabled.ios.png" />
 *     <figcaption>Enabled</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/checkbox-disabled.ios.png" />
 *     <figcaption>Disabled</figcaption>
 *   </figure>
 * </div>
 */
const CheckboxIOS = (
    {
        status,
        disabled = false,
        size = 'sm',
        onChange,
        color: colorProp,
        style,
        testID,
        ...rest
    }: Props,
    ref: any,
) => {
    const { TouchableRipple, Icon, View } = useMolecules();

    const checked = status === 'checked';
    const indeterminate = status === 'indeterminate';

    const componentStyles = useComponentStyles('Checkbox', style, {
        variant: 'ios',
        states: {
            disabled,
            checked,
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

CheckboxIOS.displayName = 'Checkbox.IOS';

export default memo(forwardRef(CheckboxIOS));

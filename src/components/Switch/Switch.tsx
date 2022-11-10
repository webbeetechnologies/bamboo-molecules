import { forwardRef, memo, useMemo } from 'react';
import type { ComponentPropsWithRef } from 'react';
import {
    NativeModules,
    Platform,
    StyleProp,
    Switch as NativeSwitch,
    ViewStyle,
} from 'react-native';
import setColor from 'color';

import type { ComponentStylePropWithVariants } from '../../types';
import { useComponentStyles } from '../../hooks';

const version = NativeModules.PlatformConstants
    ? NativeModules.PlatformConstants.reactNativeVersion
    : undefined;

export type Props = ComponentPropsWithRef<typeof NativeSwitch> & {
    /**
     * Disable toggling the switch.
     */
    disabled?: boolean;
    /**
     * Value of the switch, true means 'on', false means 'off'.
     */
    value?: boolean;
    /**
     * Custom color for switch.
     */
    color?: string;
    /**
     * Callback called with the new value when it changes.
     */
    onValueChange?: Function;
    style?: StyleProp<ViewStyle>;
};

/**
 * Switch is a visual toggle between two mutually exclusive states — on and off.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/switch-enabled.android.png" />
 *     <figcaption>Android (enabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/switch-disabled.android.png" />
 *     <figcaption>Android (disabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/switch-enabled.ios.png" />
 *     <figcaption>iOS (enabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/switch-disabled.ios.png" />
 *     <figcaption>iOS (disabled)</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Switch } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [isSwitchOn, setIsSwitchOn] = React.useState(false);
 *
 *   const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
 *
 *   return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
 * };
 *
 * export default MyComponent;
 * ```
 */
const Switch = (
    {
        value,
        disabled,
        onValueChange,
        color,
        style,
        onTintColor: onTintColorProp,
        thumbTintColor: thumbTintColorProp,
        ...rest
    }: Props,
    ref: any,
) => {
    const componentStyles = useComponentStyles(
        'Switch',
        [
            style,
            {
                checkedColor: color,
                onTintColor: onTintColorProp,
                thumbTintColor: thumbTintColorProp,
            },
        ],
        {
            states: {
                selected_disabled: !!value && !!disabled,
                active: !!value,
                disabled: !!disabled,
            },
        },
    );

    const { switchStyle, props } = useMemo(() => {
        const {
            checkedColor,
            onTintColor: _onTintColor,
            thumbTintColor: _thumbTintColor,
            ...switchStyles
        } = componentStyles;

        const thumbTintColor = value && !disabled ? checkedColor : _thumbTintColor;
        const onTintColor =
            value && !disabled ? setColor(checkedColor).alpha(0.5).rgb().string() : _onTintColor;

        return {
            switchStyle: switchStyles,
            props:
                version && version.major === 0 && version.minor <= 56
                    ? {
                          onTintColor,
                          thumbTintColor,
                      }
                    : Platform.OS === 'web'
                    ? {
                          activeTrackColor: onTintColor,
                          thumbColor: thumbTintColor,
                          activeThumbColor: checkedColor,
                      }
                    : {
                          thumbColor: thumbTintColor,
                          trackColor: {
                              true: onTintColor,
                              false: onTintColor,
                          },
                      },
        };
    }, [componentStyles, disabled, value]);

    return (
        <NativeSwitch
            ref={ref}
            value={value}
            disabled={disabled}
            onValueChange={disabled ? undefined : onValueChange}
            style={switchStyle}
            {...props}
            {...rest}
        />
    );
};

type CustomProp = { checkedColor?: string; thumbTintColor?: string; onTintColor?: string };

export const defaultStyles: ComponentStylePropWithVariants<
    ViewStyle,
    'selected_disabled' | 'active' | 'disabled',
    CustomProp
> = {
    thumbTintColor: 'colors.neutral1',
    onTintColor: 'colors.onNeutral1',

    states: {
        active: {
            thumbTintColor: 'colors.neutral1',
            onTintColor: 'colors.onNeutral1',
        },
        disabled: {
            thumbTintColor: 'colors.disabled',
            onTintColor: 'colors.disabledOnBackground',
        },
        selected_disabled: {
            thumbTintColor: 'colors.neutral1',
            onTintColor: 'colors.disabledOnBackground',
        },
    },
};

export default memo(forwardRef(Switch));

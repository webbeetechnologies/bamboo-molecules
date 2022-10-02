import { memo, useMemo } from 'react';
import type { ComponentPropsWithRef } from 'react';
import {
    NativeModules,
    Platform,
    StyleProp,
    Switch as NativeSwitch,
    ViewStyle,
} from 'react-native';

import { useColorMode, useComponentTheme } from '../../hooks';
import { getSwitchColor } from './utils';

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
const Switch = ({ value, disabled, onValueChange, color, ...rest }: Props) => {
    const switchStyles = useComponentTheme('Switch');
    const colorMode = useColorMode();

    const { checkedColor, onTintColor, thumbTintColor } = useMemo(
        () =>
            getSwitchColor({
                switchStyles,
                disabled,
                value,
                color,
                colorMode,
            }),
        [switchStyles, disabled, value, color, colorMode],
    );

    const props =
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
              };

    return (
        <NativeSwitch
            value={value}
            disabled={disabled}
            onValueChange={disabled ? undefined : onValueChange}
            {...props}
            {...rest}
        />
    );
};

export const defaultStyles = {
    defaultCheckColor: 'colors.primary',
    defaultThumbTintColors: {},
};

export default memo(Switch);

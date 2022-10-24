import { useMemo } from 'react';

import { useCurrentTheme, usePlatformType } from '../../hooks';
import { normalizeStyles } from '../../utils';

import CheckboxIOS from './CheckboxIOS';
import CheckboxAndroid from './CheckboxAndroid';
import type { CheckBoxBaseProps } from './types';

export type Props = CheckBoxBaseProps;

/**
 * Checkboxes allow the selection of multiple options from a set.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/checkbox-enabled.android.png" />
 *     <figcaption>Android (enabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/checkbox-disabled.android.png" />
 *     <figcaption>Android (disabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/checkbox-enabled.ios.png" />
 *     <figcaption>iOS (enabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/checkbox-disabled.ios.png" />
 *     <figcaption>iOS (disabled)</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Checkbox } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [checked, setChecked] = React.useState(false);
 *
 *   return (
 *     <Checkbox
 *       status={checked ? 'checked' : 'unchecked'}
 *       onPress={() => {
 *         setChecked(!checked);
 *       }}
 *     />
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const Checkbox = ({ color, uncheckedColor, ...rest }: Props) => {
    const platform = usePlatformType();
    const currentTheme = useCurrentTheme();
    const normalizedProps = normalizeStyles({ color, uncheckedColor }, currentTheme);

    const props = useMemo(
        () => ({
            ...normalizedProps,
            ...rest,
        }),
        [normalizedProps, rest],
    );

    return platform === 'ios' ? <CheckboxIOS {...props} /> : <CheckboxAndroid {...props} />;
};

export default Checkbox;

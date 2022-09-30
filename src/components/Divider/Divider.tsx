import { memo } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentTheme, useMolecules } from '../../hooks';
import { withNormalizedStyleProp } from '../../hocs';

export type Props = Omit<ViewProps, 'children'> & {
    /**
     * @renamed Renamed from 'inset' to 'leftInset` in v5.x
     * Whether divider has a left inset.
     */
    leftInset?: boolean;
    /**
     * @supported Available in v5.x with theme version 3
     *  Whether divider has a horizontal inset on both sides.
     */
    horizontalInset?: boolean;
    /**
     * @supported Available in v5.x with theme version 3
     *  Whether divider should be bolded.
     */
    bold?: boolean;
    style?: StyleProp<ViewStyle>;
};

/**
 * A divider is a thin, lightweight separator that groups content in lists and page layouts.
 *
 * <div class="screenshots">
 *  <figure>
 *    <img class="medium" src="screenshots/divider.png" />
 *  </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { Divider, Text } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <View>
 *     <Text>Lemon</Text>
 *     <Divider />
 *     <Text>Mango</Text>
 *     <Divider />
 *   </View>
 * );
 *
 * export default MyComponent;
 * ```
 */

const Divider = ({ leftInset, horizontalInset = false, style, bold = false, ...rest }: Props) => {
    const { View } = useMolecules();
    const {
        leftInset: leftInsetStyles,
        horizontalInset: horizontalInsetStyles,
        bold: boldStyles,
        ...defaultStyles
    } = useComponentTheme('Divider');

    return (
        <View
            {...rest}
            style={[
                defaultStyles,
                leftInset && leftInsetStyles,
                horizontalInset && horizontalInsetStyles,
                bold && boldStyles,
                style,
            ]}
        />
    );
};

export const dividerStyles = {
    height: StyleSheet.hairlineWidth,
    background: 'colors.surfaceVariant',

    leftInset: {
        marginLeft: 72,
    },
    horizontalInset: {
        marginLeft: 28,
        marginRight: 28,
    },
    bold: {
        height: 1,
    },
};

export default memo(withNormalizedStyleProp(Divider));

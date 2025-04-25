import { memo, useMemo } from 'react';
import { type ViewStyle, type StyleProp, type ViewProps, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { registerComponentStyles, getRegisteredMoleculesComponentStyles } from '../../core';

export type Props = Omit<ViewProps, 'children'> & {
    /**
     * left inset of the divider.
     */
    leftInset?: number;
    /**
     * right inset of the divider.
     */
    rightInset?: number;
    /**
     *  Whether divider should be bolded.
     */
    bold?: boolean;
    /**
     *  Vertical spacing of the Divider
     */
    spacing?: number;
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

const HorizontalDivider = ({
    leftInset = 0,
    rightInset = 0,
    style,
    bold = false,
    spacing = 0,
    ...rest
}: Props) => {
    horizontalDividerStyles.useVariants({
        isBold: bold,
    });

    const memoizedStyles = useMemo(() => {
        return [
            horizontalDividerStyles.root,
            leftInset && { marginLeft: leftInset },
            rightInset && { marginRight: rightInset },
            spacing && { marginVertical: spacing },
            style,
        ];
    }, [leftInset, rightInset, spacing, style]);

    return <View {...rest} style={memoizedStyles as StyleProp<ViewStyle>} />;
};

export const horizontalDividerStylesDefault = StyleSheet.create(theme => ({
    root: {
        height: StyleSheet.hairlineWidth,
        background: theme.colors.outlineVariant,

        variants: {
            isBold: {
                true: {
                    height: 1,
                },
            },
        },
    },
}));

registerComponentStyles('HorizontalDivider', horizontalDividerStylesDefault);
export const horizontalDividerStyles = getRegisteredMoleculesComponentStyles('HorizontalDivider');

export default memo(HorizontalDivider);

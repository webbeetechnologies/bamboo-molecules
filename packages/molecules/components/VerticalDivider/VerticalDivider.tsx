import { memo, useMemo } from 'react';
import { type ViewStyle, type StyleProp, type ViewProps, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { registerComponentStyles, getRegisteredMoleculesComponentStyles } from '../../core';

export type Props = Omit<ViewProps, 'children'> & {
    /**
     *  Top Inset of the Divider.
     */
    topInset?: number;
    /**
     *  Bottom Inset of the Divider.
     */
    bottomInset?: number;
    /**
     *  Whether divider should be bolded.
     */
    bold?: boolean;
    /**
     *  Horizontal spacing of the Divider
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

const VerticalDivider = ({
    topInset = 0,
    bottomInset = 0,
    spacing = 0,
    style,
    bold = false,
    ...rest
}: Props) => {
    verticalDividerStyles.useVariants({
        isBold: bold,
    });

    const memoizedStyles = useMemo(() => {
        return [
            verticalDividerStyles.root,
            style,
            topInset && { marginTop: topInset },
            bottomInset && { marginBottom: bottomInset },
            spacing && { marginHorizontal: spacing },
        ] as StyleProp<ViewStyle>;
    }, [bottomInset, style, spacing, topInset]);

    return <View {...rest} style={memoizedStyles} />;
};

export const verticalDividerStylesDefault = StyleSheet.create(theme => ({
    root: {
        width: StyleSheet.hairlineWidth,
        background: theme.colors.outlineVariant,

        variants: {
            isBold: {
                true: {
                    width: 1,
                },
            },
        },
    },
}));

registerComponentStyles('VerticalDivider', verticalDividerStylesDefault);
export const verticalDividerStyles = getRegisteredMoleculesComponentStyles('HorizontalDivider');

export default memo(VerticalDivider);

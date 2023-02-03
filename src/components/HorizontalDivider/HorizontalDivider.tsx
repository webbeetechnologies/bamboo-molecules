import { memo, useMemo } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

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
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('HorizontalDivider', style);

    const memoizedStyles = useMemo(() => {
        const { bold: boldStyles, ...defaultStyles } = componentStyles;

        return [
            defaultStyles,
            leftInset && { marginLeft: leftInset },
            rightInset && { marginRight: rightInset },
            bold && boldStyles,
            spacing && { marginVertical: spacing },
        ];
    }, [bold, componentStyles, leftInset, rightInset, spacing]);

    return <View {...rest} style={memoizedStyles} />;
};

export const horizontalDividerStyles = {
    height: StyleSheet.hairlineWidth,
    background: 'colors.outlineVariant',
    bold: {
        height: 1,
    },
};

export default memo(HorizontalDivider);

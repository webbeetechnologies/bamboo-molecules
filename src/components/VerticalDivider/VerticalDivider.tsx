import { memo, useMemo } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

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
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('VerticalDivider', style);

    const memoizedStyles = useMemo(() => {
        const { bold: boldStyles, ...defaultStyles } = componentStyles;

        return [
            defaultStyles,
            topInset && { marginTop: topInset },
            bottomInset && { marginBottom: bottomInset },
            bold && boldStyles,
            spacing && { marginHorizontal: spacing },
        ];
    }, [bold, bottomInset, componentStyles, spacing, topInset]);

    return <View {...rest} style={memoizedStyles} />;
};

export const verticalDividerStyles = {
    width: StyleSheet.hairlineWidth,
    background: 'colors.outlineVariant',
    bold: {
        width: 1,
    },
};

export default memo(VerticalDivider);

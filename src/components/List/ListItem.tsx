import { ReactNode, memo, useMemo, forwardRef } from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import type { WithElements } from '../../types';
import { useMolecules, useComponentStyles } from '../../hooks';
import type { TouchableRippleProps } from '../TouchableRipple';
import { CallbackActionState, withActionState } from '../../hocs';

export type Props = Omit<TouchableRippleProps, 'children'> &
    WithElements<ReactNode> &
    CallbackActionState & {
        /**
         * Title text for the list item.
         */
        title?: string;
        /**
         * Description text for the list item or callback which returns a React element to display the description.
         */
        children?: ReactNode;
        /**
         * Style that is passed to the wrapping TouchableRipple element.
         */
        style?: StyleProp<ViewStyle>;
        /**
         * Style that is passed to Title element.
         */
        titleStyle?: StyleProp<TextStyle>;
        /**
         * Style that is passed to Description element.
         */
        descriptionStyle?: StyleProp<TextStyle>;
        /**
         * Truncate Title text such that the total number of lines does not
         * exceed this number.
         */
        titleNumberOfLines?: number;
        /**
         * Ellipsize Mode for the Title.  One of `'head'`, `'middle'`, `'tail'`, `'clip'`.
         *
         * See [`ellipsizeMode`](https://reactnative.dev/docs/text#ellipsizemode)
         */
        titleEllipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
        /**
         * Whether the divider shows or not.
         */
        divider?: boolean;
    };

/**
 * A component to show tiles inside a List.
 *
 * <div class="screenshots">
 *   <img class="medium" src="screenshots/list-item-1.png" />
 *   <img class="medium" src="screenshots/list-item-2.png" />
 *   <img class="medium" src="screenshots/list-item-3.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { List } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <List.Item
 *     title="First Item"
 *     description="Item description"
 *     left={props => <List.Icon {...props} icon="folder" />}
 *   />
 * );
 *
 * export default MyComponent;
 * ```
 *
 * @extends TouchableWithoutFeedback props https://reactnative.dev/docs/touchablewithoutfeedback#props
 */
const ListItem = (
    {
        left,
        right,
        title,
        children,
        style: styleProp,
        titleStyle: titleStyleProp,
        descriptionStyle: descriptionStyleProp,
        titleNumberOfLines = 1,
        titleEllipsizeMode,
        disabled = false,
        hovered,
        focused,
        pressed,
        divider = false,
        ...props
    }: Props,
    ref: any,
) => {
    const { Text, TouchableRipple, View, HorizontalDivider } = useMolecules();

    const componentStyles = useComponentStyles(
        'ListItem',
        [styleProp, { titleStyle: titleStyleProp, descriptionStyle: descriptionStyleProp }],
        { states: { disabled, hovered: !!hovered, focused: !!focused, pressed: !!pressed } },
    );

    const { titleStyles, containerStyles, leftElementStyle, rightElementStyle } = useMemo(() => {
        const { titleStyle, leftElement, rightElement, ...itemStyles } = componentStyles;
        return {
            containerStyles: itemStyles,
            titleStyles: titleStyle,
            leftElementStyle: leftElement,
            rightElementStyle: rightElement,
        };
    }, [componentStyles]);

    return (
        <TouchableRipple {...props} style={containerStyles} disabled={disabled} ref={ref}>
            <>
                <View style={styles.row}>
                    {left ? <View style={leftElementStyle}>{left}</View> : null}
                    <View style={styles.content}>
                        <>
                            {title && (
                                <Text
                                    style={titleStyles}
                                    selectable={false}
                                    ellipsizeMode={titleEllipsizeMode}
                                    numberOfLines={titleNumberOfLines}>
                                    {title}
                                </Text>
                            )}
                        </>

                        <Text>{children}</Text>
                    </View>
                    {right ? <View style={rightElementStyle}>{right}</View> : null}
                </View>
                {divider && <HorizontalDivider leftInset={16} rightInset={24} />}
            </>
        </TouchableRipple>
    );
};

ListItem.displayName = 'List.Item';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default memo(withActionState(forwardRef(ListItem)));

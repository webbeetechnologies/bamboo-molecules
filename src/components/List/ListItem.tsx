import { ReactNode, memo, useMemo, forwardRef } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import type { WithElements } from '../../types';
import { useMolecules, useComponentStyles } from '../../hooks';
import type { TouchableRippleProps } from '../TouchableRipple';
import { CallbackActionState, withActionState } from '../../hocs';

type Title =
    | ReactNode
    | ((props: {
          selectable: boolean;
          ellipsizeMode: 'head' | 'middle' | 'tail' | 'clip' | undefined;
          color: string;
          fontSize: number;
      }) => ReactNode);

type Description =
    | ReactNode
    | ((props: {
          selectable: boolean;
          ellipsizeMode: 'head' | 'middle' | 'tail' | 'clip' | undefined;
          color: string;
          fontSize: number;
      }) => ReactNode);

type Element = ReactNode;

export type Props = Omit<TouchableRippleProps, 'children'> &
    WithElements<Element> &
    CallbackActionState & {
        /**
         * Title text for the list item.
         */
        title: Title;
        /**
         * Description text for the list item or callback which returns a React element to display the description.
         */
        description?: Description;
        /**
         * Function to execute on press.
         */
        onPress?: () => void;
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
         * Truncate Description text such that the total number of lines does not
         * exceed this number.
         */
        descriptionNumberOfLines?: number;
        /**
         * Ellipsize Mode for the Title.  One of `'head'`, `'middle'`, `'tail'`, `'clip'`.
         *
         * See [`ellipsizeMode`](https://reactnative.dev/docs/text#ellipsizemode)
         */
        titleEllipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
        /**
         * Ellipsize Mode for the Description.  One of `'head'`, `'middle'`, `'tail'`, `'clip'`.
         *
         * See [`ellipsizeMode`](https://reactnative.dev/docs/text#ellipsizemode)
         */
        descriptionEllipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';

        disabled?: boolean;
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
        description,
        onPress,
        style: styleProp,
        titleStyle: titleStyleProp,
        descriptionStyle: descriptionStyleProp,
        titleNumberOfLines = 1,
        descriptionNumberOfLines = 2,
        titleEllipsizeMode,
        descriptionEllipsizeMode,
        disabled = false,
        hovered,
        focused,
        pressed,
        ...props
    }: Props,
    ref: any,
) => {
    const { Text, TouchableRipple } = useMolecules();

    const componentStyles = useComponentStyles(
        'ListItem',
        [styleProp, { titleStyle: titleStyleProp, descriptionStyle: descriptionStyleProp }],
        { states: { disabled, hovered: !!hovered, focused: !!focused, pressed: !!pressed } },
    );

    const { titleStyles, descriptionStyles, containerStyles } = useMemo(() => {
        const { titleColor, descriptionColor, titleStyle, descriptionStyle, ...itemStyles } =
            componentStyles;
        return {
            containerStyles: itemStyles,
            titleStyles: [{ color: titleColor }, titleStyle],
            descriptionStyles: [{ color: descriptionColor }, descriptionStyle],
        };
    }, [componentStyles]);

    return (
        <TouchableRipple
            {...props}
            style={containerStyles}
            onPress={onPress}
            disabled={disabled}
            ref={ref}>
            <View style={styles.row}>
                {left ? left : null}
                <View style={[styles.content]}>
                    <Text
                        style={titleStyles}
                        selectable={false}
                        titleEllipsizeMode={titleEllipsizeMode}
                        titleNumberOfLines={titleNumberOfLines}>
                        {title}
                    </Text>
                    {description ? (
                        <Text
                            style={descriptionStyles}
                            selectable={false}
                            titleEllipsizeMode={descriptionEllipsizeMode}
                            titleNumberOfLines={descriptionNumberOfLines}>
                            {description}
                        </Text>
                    ) : null}
                </View>
                {right ? right : null}
            </View>
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

import { ReactNode, memo } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import type { WithElements } from '../../types';
import { useMolecules, useComponentStyles } from '../../hooks';
import type { TouchableRippleProps } from '../TouchableRipple';

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

type Element = (props: {
    color: string;
    style: {
        marginLeft?: number;
        marginRight: number;
        marginVertical?: number;
    };
}) => ReactNode;

export type Props = Omit<TouchableRippleProps, 'children'> &
    WithElements<Element> & {
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
const ListItem = ({
    left,
    right,
    title,
    description,
    onPress,
    style: styleProp,
    titleStyle,
    titleNumberOfLines = 1,
    descriptionNumberOfLines = 2,
    titleEllipsizeMode,
    descriptionEllipsizeMode,
    descriptionStyle,
    ...rest
}: Props) => {
    const { Text, TouchableRipple } = useMolecules();

    const { Title, titleColor, descriptionColor, ...itemStyles } = useComponentStyles(
        'ListItem',
        styleProp,
    );

    console.log('...', Title);

    const renderDescription = (descriptionColor: string, description?: Description | null) => {
        return typeof description === 'function' ? (
            description({
                selectable: false,
                ellipsizeMode: descriptionEllipsizeMode,
                color: descriptionColor,
                fontSize: styles.description.fontSize,
            })
        ) : (
            <Text
                selectable={false}
                numberOfLines={descriptionNumberOfLines}
                ellipsizeMode={descriptionEllipsizeMode}
                style={[styles.description, { color: descriptionColor }, descriptionStyle]}>
                {description}
            </Text>
        );
    };

    const renderTitle = () => {
        return typeof title === 'function' ? (
            title({
                selectable: false,
                ellipsizeMode: titleEllipsizeMode,
                color: titleColor,
                fontSize: styles.title.fontSize,
            })
        ) : (
            <Text
                selectable={false}
                ellipsizeMode={titleEllipsizeMode}
                numberOfLines={titleNumberOfLines}
                style={[styles.title, { color: titleColor }, titleStyle]}>
                {title}
            </Text>
        );
    };

    return (
        <TouchableRipple {...rest} style={[styles.container, itemStyles]} onPress={onPress}>
            <View style={styles.row}>
                {left
                    ? left({
                          color: descriptionColor,
                          style: description
                              ? styles.iconMarginLeft
                              : {
                                    ...styles.iconMarginLeft,
                                    ...styles.marginVerticalNone,
                                },
                      })
                    : null}
                <View style={[styles.item, styles.content]}>
                    {renderTitle()}

                    {description ? renderDescription(descriptionColor, description) : null}
                </View>
                {right
                    ? right({
                          color: descriptionColor,
                          style: description
                              ? styles.iconMarginRight
                              : {
                                    ...styles.iconMarginRight,
                                    ...styles.marginVerticalNone,
                                },
                      })
                    : null}
            </View>
        </TouchableRipple>
    );
};

// ListItem.displayName = 'List.Item';

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    row: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 16,
    },
    description: {
        fontSize: 14,
    },
    marginVerticalNone: { marginVertical: 0 },
    iconMarginLeft: { marginLeft: 0, marginRight: 16 },
    iconMarginRight: { marginRight: 0 },
    item: {
        marginVertical: 6,
        paddingLeft: 8,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
});

export interface ListStyles {
    titleColor: string;
    descriptionColor: string;
    Title: any;
}

export const defaultStyles: ListStyles = {
    titleColor: 'colors.onSurface',
    descriptionColor: 'colors.onSurfaceVariants',
    Title: {
        fontSize: 16,
    },
};

export default memo(ListItem);

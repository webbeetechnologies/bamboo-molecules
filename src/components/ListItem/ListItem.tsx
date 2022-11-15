import { ReactNode, memo, useMemo, forwardRef, createContext } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { WithElements } from '../../types';
import { useMolecules, useComponentStyles } from '../../hooks';
import type { TouchableRippleProps } from '../TouchableRipple';
import { CallbackActionState, withActionState } from '../../hocs';

export type Props = Omit<TouchableRippleProps, 'children'> &
    WithElements<ReactNode> &
    CallbackActionState & {
        /**
         * Description text for the list item or callback which returns a React element to display the description.
         */
        children: ReactNode;
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
        children,
        style: styleProp,
        titleStyle: titleStyleProp,
        descriptionStyle: descriptionStyleProp,
        disabled = false,
        hovered,
        divider = false,
        ...props
    }: Props,
    ref: any,
) => {
    const { TouchableRipple, View, HorizontalDivider } = useMolecules();

    const componentStyles = useComponentStyles(
        'ListItem',
        [styleProp, { titleStyle: titleStyleProp, descriptionStyle: descriptionStyleProp }],
        { states: { disabled, hovered: !!hovered } },
    );

    const {
        containerStyles,
        innerContainerStyle,
        contentStyle,
        leftElementStyle,
        rightElementStyle,
    } = useMemo(() => {
        const { innerContainer, content, leftElement, rightElement, ...itemStyles } =
            componentStyles;
        return {
            containerStyles: itemStyles,
            innerContainerStyle: innerContainer,
            contentStyle: content,
            leftElementStyle: leftElement,
            rightElementStyle: rightElement,
        };
    }, [componentStyles]);

    return (
        <TouchableRipple {...props} style={containerStyles} disabled={disabled} ref={ref}>
            <>
                <View style={innerContainerStyle}>
                    {left ? <View style={leftElementStyle}>{left}</View> : null}
                    <View style={contentStyle}>
                        <ListItemContext.Provider value={{ disabled, hovered: !!hovered }}>
                            <>{children}</>
                        </ListItemContext.Provider>
                    </View>
                    {right ? <View style={rightElementStyle}>{right}</View> : null}
                </View>
                {divider && <HorizontalDivider />}
            </>
        </TouchableRipple>
    );
};

export const ListItemContext = createContext({
    disabled: false,
    hovered: false,
});

export default memo(withActionState(forwardRef(ListItem)));

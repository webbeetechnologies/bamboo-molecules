import { ReactNode, memo, useMemo, forwardRef, createContext } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import type { WithElements } from '../../types';
import { TouchableRipple, type TouchableRippleProps } from '../TouchableRipple';
import { CallbackActionState, withActionState } from '../../hocs';
import { resolveStateVariant } from '../../utils';
import { HorizontalDivider } from '../HorizontalDivider';
import { listItemStyles } from './utils';

export type Props = Omit<TouchableRippleProps, 'children'> &
    WithElements<ReactNode | ((renderArgs: { hovered: boolean }) => ReactNode)> &
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
         * Whether the divider shows or not.
         */
        divider?: boolean;
        /**
         * variant of the ListItem
         */
        variant?: 'default' | 'menuItem';
        /**
         * Whether the ListItem is selected or not
         */
        selected?: boolean;
        /**
         * Whether the ListItem is hoverable or not
         * @default true if onPress is passed
         */
        hoverable?: boolean;
    };

const ListItem = (
    {
        left,
        right,
        children,
        style: styleProp,
        disabled = false,
        hovered = false,
        divider = false,
        variant = 'default',
        selected = false,
        onPress,
        hoverable: hoverableProp = false,
        ...props
    }: Props,
    ref: any,
) => {
    const hoverable = hoverableProp || !!onPress;

    listItemStyles.useVariants({
        state: resolveStateVariant({
            selected,
            disabled,
            hovered: hoverable && hovered,
        }) as any,
        variant: variant as any,
    });

    const {
        containerStyles,
        innerContainerStyle,
        contentStyle,
        leftElementStyle,
        rightElementStyle,
    } = useMemo(() => {
        const { innerContainer, content, leftElement, rightElement } = listItemStyles;
        return {
            containerStyles: [listItemStyles.root, styleProp],
            innerContainerStyle: innerContainer,
            contentStyle: content,
            leftElementStyle: leftElement,
            rightElementStyle: rightElement,
        };
    }, [styleProp]);

    const contextValue = useMemo(
        () => ({ disabled, hovered: hoverable && hovered, selected, variant }),
        [disabled, hoverable, hovered, selected, variant],
    );

    return (
        <TouchableRipple
            {...props}
            style={containerStyles}
            disabled={disabled}
            onPress={onPress}
            ref={ref}>
            <>
                <View style={innerContainerStyle}>
                    {left ? (
                        <View style={leftElementStyle}>
                            {typeof left === 'function' ? left({ hovered }) : left}
                        </View>
                    ) : null}
                    <View style={contentStyle}>
                        <ListItemContext.Provider value={contextValue}>
                            <>{children}</>
                        </ListItemContext.Provider>
                    </View>
                    {right ? (
                        <View style={rightElementStyle}>
                            {typeof right === 'function' ? right({ hovered }) : right}
                        </View>
                    ) : null}
                </View>
                {divider && <HorizontalDivider />}
            </>
        </TouchableRipple>
    );
};

export const ListItemContext = createContext({
    disabled: false,
    hovered: false,
    selected: false,
    variant: 'default',
});

export default memo(withActionState(forwardRef(ListItem)));

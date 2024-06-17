import type { TouchableRippleProps } from '../TouchableRipple';
import {
    Children,
    JSXElementConstructor,
    ReactElement,
    cloneElement,
    isValidElement,
    memo,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { LayoutChangeEvent, ViewStyle } from 'react-native';
import { CallbackActionState, withActionState } from '../../hocs';
import type { ViewProps } from '@bambooapp/bamboo-atoms';

export type TabItemProps = Omit<TouchableRippleProps, 'children'> &
    CallbackActionState & {
        /**
         * name of the tab. This should be unique like a route name
         * */
        name: string;
        /**
         * Allows to define if TabItem is active.
         * */
        active?: boolean;
        /**
         * variant according to m3 guidelines
         * */
        variant?: 'primary' | 'secondary';

        contentsContainerStyle?: ViewStyle;
        contentsContainerProps?: Omit<ViewProps, 'children' | 'style' | 'onLayout'>;
        onLayoutContent?: (e: LayoutChangeEvent) => void;
        accessibilityLabel?: string;
        children: ReactElement<
            {
                active: boolean;
                hovered: boolean;
                variant: 'primary' | 'secondary';
            },
            JSXElementConstructor<{
                active: boolean;
                hovered: boolean;
                variant: 'primary' | 'secondary';
            }>
        >;
    };

const TabItemWithActionState = withActionState(
    ({
        active = false,
        variant = 'primary',
        style,
        onLayout,
        onLayoutContent,
        hovered = false,
        contentsContainerStyle: contentsContainerStyleProp,
        contentsContainerProps,
        accessibilityLabel,
        children,
        ...rest
    }: TabItemProps) => {
        const { TouchableRipple, View, StateLayer } = useMolecules();

        const [itemHeight, setItemHeight] = useState(0);

        const componentStyles = useComponentStyles(
            'Tabs_Item',
            [
                style,
                {
                    contentsContainer: contentsContainerStyleProp || {},
                },
            ],
            {
                variant,
                states: {
                    activeAndHovered: active && hovered,
                    hovered,
                    active,
                },
            },
        );

        const { contentsContainerStyle, stateLayerStyle, containerStyle } = useMemo(() => {
            const {
                minHeight,
                contentsContainer,
                label: _labelStyle,
                stateLayer,
                ...restStyle
            } = componentStyles;

            return {
                containerStyle: [
                    {
                        minHeight: Math.max(itemHeight, minHeight),
                    },
                    restStyle,
                ],
                contentsContainerStyle: contentsContainer,
                stateLayerStyle: stateLayer,
            };
        }, [componentStyles, itemHeight]);

        const useLayoutContentRef = useRef(onLayoutContent);
        const onLayoutHandled = useCallback((e: LayoutChangeEvent) => {
            useLayoutContentRef.current?.(e);
            setItemHeight(e.nativeEvent.layout.height);
        }, []);

        const { accessibilityState, accessibilityValue } = useMemo(
            () => ({
                accessibilityState: { selected: active },
                accessibilityValue:
                    typeof accessibilityLabel === 'string'
                        ? { text: accessibilityLabel }
                        : undefined,
            }),
            [active, accessibilityLabel],
        );

        return (
            <TouchableRipple
                style={containerStyle}
                accessibilityRole="tab"
                accessibilityState={accessibilityState}
                accessibilityValue={accessibilityValue}
                {...rest}
                onLayout={onLayout}>
                <>
                    <View
                        style={contentsContainerStyle}
                        {...contentsContainerProps}
                        onLayout={onLayoutHandled}>
                        {Children.map(children, child => {
                            if (!isValidElement(child)) return null;
                            return cloneElement(child, {
                                active,
                                hovered,
                                variant,
                            });
                        })}
                    </View>

                    <StateLayer style={stateLayerStyle} />
                </>
            </TouchableRipple>
        );
    },
);

const TabItem = memo(
    ({ actionStateContainerProps: _actionStateContainerProps, ...rest }: TabItemProps) => {
        const { actionStateContainerProps } = useMemo(
            () => ({
                actionStateContainerProps: {
                    ..._actionStateContainerProps,
                    style: [{ flex: 1 }, _actionStateContainerProps?.style],
                },
            }),
            [_actionStateContainerProps],
        );

        return (
            <TabItemWithActionState
                {...rest}
                actionStateContainerProps={actionStateContainerProps}
            />
        );
    },
);

TabItem.displayName = 'Tabs_Item';

export default TabItem;

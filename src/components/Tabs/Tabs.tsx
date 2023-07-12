import {
    Children,
    cloneElement,
    FC,
    isValidElement,
    memo,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Animated,
    StyleProp,
    ViewStyle,
    ViewProps,
    ScrollView as RNScrollView,
    LayoutChangeEvent,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import type { TabItemProps } from './TabItem';
import { useComponentStyles, useControlledValue, useMolecules } from '../../hooks';
import { noop } from '../../utils';
import type { HorizontalDividerProps } from '../HorizontalDivider';

export type TabsProps = ViewProps & {
    /** Child position index value. */
    value?: string;

    /** Makes Tab Scrolling */
    scrollable?: boolean;

    /** On Index Change Callback. */
    onChange?: (value: string) => void;

    /** Disable the indicator below. */
    disableIndicator?: boolean;

    /** Additional styling for tab indicator. */
    indicatorStyle?: StyleProp<ViewStyle>;

    indicatorProps?: Omit<ViewStyle, 'style'>;

    dividerStyle?: ViewStyle;

    dividerProps?: Omit<HorizontalDividerProps, 'style'>;

    /** Define the background Variant. */
    variant?: 'primary' | 'secondary';
    activeColor?: string;
};

const emptyObj = {};

export const TabBase = ({
    children,
    value: valueProp,
    scrollable = false,
    onChange: onChangeProp = noop,
    indicatorStyle: indicatorStyleProp = emptyObj,
    disableIndicator,
    style,
    variant = 'primary',
    indicatorProps,
    dividerStyle: dividerStyleProp = emptyObj,
    dividerProps,
    activeColor: activeColorProp,
    ...rest
}: TabsProps) => {
    const { View, ScrollView, HorizontalDivider } = useMolecules();

    const componentStyles = useComponentStyles(
        'Tabs',
        [
            style,
            {
                indicator: indicatorStyleProp,
                divider: dividerStyleProp,
                ...(activeColorProp ? { activeColor: activeColorProp } : {}),
            },
        ],
        {
            variant,
        },
    );

    const validChildren = useMemo(
        () =>
            Children.toArray(children).filter(
                child => isValidElement(child) && (child?.type as FC).displayName === 'Tabs_Item',
            ),
        [children],
    );

    const nameToIndexMap = useMemo(
        () =>
            validChildren.reduce((acc, child, currentIndex) => {
                acc[(child as ReactElement).props?.name] = currentIndex;

                return acc;
            }, {} as Record<string, number>),
        [validChildren],
    );

    const [value, onChange] = useControlledValue({
        value: valueProp,
        onChange: onChangeProp,
        defaultValue: (validChildren[0] as ReactElement)?.props?.name,
    });

    const valueIndex = nameToIndexMap[value];

    const animationRef = useRef(new Animated.Value(0));
    const scrollViewRef = useRef<RNScrollView>(null);
    const scrollViewPosition = useRef(0);

    const tabItemPositions = useRef<Array<{ position: number; width: number; textWidth: number }>>(
        [],
    );
    const [tabContainerWidth, setTabContainerWidth] = useState(0);

    const scrollHandler = useCallback(
        (currValue: number) => {
            if (tabItemPositions.current.length > currValue) {
                const itemStartPosition =
                    currValue === 0 ? 0 : tabItemPositions.current[currValue - 1].position;
                const itemEndPosition = tabItemPositions.current[currValue].position;

                const scrollCurrentPosition = scrollViewPosition.current;
                const tabContainerCurrentWidth = tabContainerWidth;

                let scrollX = scrollCurrentPosition;

                if (itemStartPosition < scrollCurrentPosition) {
                    scrollX += itemStartPosition - scrollCurrentPosition;
                } else if (scrollCurrentPosition + tabContainerCurrentWidth < itemEndPosition) {
                    scrollX += itemEndPosition - (scrollCurrentPosition + tabContainerCurrentWidth);
                }

                scrollViewRef.current!.scrollTo({
                    x: scrollX,
                    y: 0,
                    animated: true,
                });
            }
        },
        [tabContainerWidth],
    );

    useEffect(() => {
        Animated.timing(animationRef.current, {
            toValue: valueIndex,
            useNativeDriver: true,
            duration: 170,
        }).start();

        scrollable && requestAnimationFrame(() => scrollHandler(valueIndex));
    }, [animationRef, scrollHandler, valueIndex, scrollable]);

    const onScrollHandler = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollViewPosition.current = event.nativeEvent.contentOffset.x;
    }, []);

    const indicatorTransitionInterpolate = useMemo(() => {
        const countItems = validChildren.length;
        if (countItems < 2 || !tabItemPositions.current.length) {
            return 0;
        }
        const inputRange = Array.from(Array(countItems).keys());
        const outputRange = tabItemPositions.current.map(({ position }) => position);

        return animationRef.current.interpolate({
            inputRange,
            outputRange,
        });
        // to make useMemo in sync with the ref
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animationRef, variant, validChildren, tabItemPositions.current.length]);

    const WIDTH = useMemo(() => {
        return variant === 'primary'
            ? tabItemPositions.current[valueIndex]?.textWidth
            : tabItemPositions.current[valueIndex]?.width;
        // to make useMemo in sync with the ref
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, variant, tabItemPositions.current.length]);

    const { containerStyle, itemsContainerStyle, dividerStyle, indicatorStyle } = useMemo(() => {
        const { indicator, itemsContainer, divider, activeColor, ...restStyle } = componentStyles;

        return {
            containerStyle: restStyle,
            itemsContainerStyle: itemsContainer,
            dividerStyle: divider,
            indicatorStyle: [
                indicator,
                {
                    backgroundColor: activeColor,
                    transform: [
                        {
                            translateX: indicatorTransitionInterpolate,
                        },
                    ],
                    width: WIDTH,
                },
            ],
        };
    }, [WIDTH, componentStyles, indicatorTransitionInterpolate]);

    const Container = scrollable ? ScrollView : View;
    const containerProps = scrollable
        ? {
              horizontal: true,
              ref: scrollViewRef,
              onScroll: onScrollHandler,
              showsHorizontalScrollIndicator: false,
              style: itemsContainerStyle,
          }
        : {};

    const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
        setTabContainerWidth(layout.width);
    }, []);

    const onLayoutItem = useCallback(
        (event: LayoutChangeEvent, index: number) => {
            const { width } = event.nativeEvent.layout;

            const previousItemWidth = tabItemPositions.current.reduce((acc, item, i) => {
                if (index <= i) return acc;

                acc += item.width || 0;

                return acc;
            }, 0);

            const currentItemPosition = tabItemPositions.current[index];

            tabItemPositions.current[index] = {
                ...currentItemPosition,
                position:
                    variant === 'primary'
                        ? previousItemWidth + (width - currentItemPosition?.textWidth) / 2
                        : previousItemWidth,
                width: width,
            };
        },
        [variant],
    );

    const onLayoutText = useCallback(
        (event: LayoutChangeEvent, index: number) => {
            if (variant !== 'primary') return;

            const { width } = event.nativeEvent.layout;

            const currentItemPosition = tabItemPositions.current[index];

            tabItemPositions.current[index] = {
                ...currentItemPosition,
                textWidth: width,
            };
        },
        [variant],
    );

    return (
        <View {...rest} style={containerStyle} accessibilityRole="tablist" onLayout={onLayout}>
            <>
                <Container {...containerProps} style={itemsContainerStyle}>
                    {validChildren.map((child, index) => (
                        <ChildItem
                            key={(child as ReactElement).props?.name}
                            index={index}
                            value={value}
                            child={child as ReactElement<TabItemProps>}
                            onChange={onChange}
                            onLayout={onLayoutItem}
                            onLayoutContent={onLayoutText}
                            variant={variant}
                        />
                    ))}

                    {!disableIndicator && (
                        <Animated.View {...indicatorProps} style={indicatorStyle} />
                    )}
                </Container>

                <HorizontalDivider {...dividerProps} style={dividerStyle} />
            </>
        </View>
    );
};

const ChildItem = memo(
    ({
        value,
        child,
        onChange,
        onLayout: onLayoutProp,
        onLayoutContent: onLayoutContentProp,
        variant,
        index,
    }: {
        variant: TabsProps['variant'];
        child: ReactElement<TabItemProps>;
        onChange: TabsProps['onChange'];
        onLayout: (event: LayoutChangeEvent, index: number) => void;
        onLayoutContent: (event: LayoutChangeEvent, index: number) => void;
        value: string;
        index: number;
    }) => {
        const name = child.props?.name;

        const onPress = useCallback(() => {
            onChange?.(name);
        }, [name, onChange]);

        const onLayout = useCallback(
            (e: LayoutChangeEvent) => {
                onLayoutProp(e, index);
            },
            [index, onLayoutProp],
        );

        const onLayoutContent = useCallback(
            (e: LayoutChangeEvent) => {
                onLayoutContentProp(e, index);
            },
            [index, onLayoutContentProp],
        );

        return cloneElement(child, {
            onPress,
            onLayout,
            active: name === value,
            onLayoutContent,
            variant,
        });
    },
);

TabBase.displayName = 'Tabs';

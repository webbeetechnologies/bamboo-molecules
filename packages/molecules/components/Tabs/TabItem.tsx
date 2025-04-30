import {
    Children,
    JSXElementConstructor,
    ReactElement,
    cloneElement,
    forwardRef,
    isValidElement,
    memo,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';
import { type LayoutChangeEvent, type ViewStyle, type ViewProps, View } from 'react-native';

import { useActionState } from '../../hooks';
import { TouchableRipple, type TouchableRippleProps } from '../TouchableRipple';
import { resolveStateVariant } from '../../utils';
import { StateLayer } from '../StateLayer';
import { tabsItemStyles } from './utils';

export type TabItemProps = Omit<TouchableRippleProps, 'children' | 'ref'> & {
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

const TabItem = (
    {
        active = false,
        variant = 'primary',
        style,
        onLayout,
        onLayoutContent,
        contentsContainerStyle: contentsContainerStyleProp,
        contentsContainerProps,
        accessibilityLabel,
        children,
        ...rest
    }: TabItemProps,
    ref: any,
) => {
    const { hovered, actionsRef } = useActionState({ ref, actionsToListen: ['hover'] });
    const [itemHeight, setItemHeight] = useState(0);

    tabsItemStyles.useVariants({
        variant,
        state: resolveStateVariant({
            activeAndHovered: active && hovered,
            hovered,
            active,
        }),
    });

    const { contentsContainerStyle, stateLayerStyle, containerStyle } = useMemo(() => {
        const minHeight = 48;
        return {
            containerStyle: [
                tabsItemStyles.root,
                {
                    minHeight: Math.max(minHeight, itemHeight),
                },
                style,
            ],
            contentsContainerStyle: [tabsItemStyles.contentsContainer, contentsContainerStyleProp],
            stateLayerStyle: tabsItemStyles.stateLayer,
        };
    }, [contentsContainerStyleProp, itemHeight, style]);

    const useLayoutContentRef = useRef(onLayoutContent);
    const onLayoutHandled = useCallback((e: LayoutChangeEvent) => {
        useLayoutContentRef.current?.(e);
        setItemHeight(e.nativeEvent.layout.height);
    }, []);

    const { accessibilityState, accessibilityValue } = useMemo(
        () => ({
            accessibilityState: { selected: active },
            accessibilityValue:
                typeof accessibilityLabel === 'string' ? { text: accessibilityLabel } : undefined,
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
            ref={actionsRef}
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
};

const _TabItem = memo(forwardRef(TabItem));

_TabItem.displayName = 'Tabs_Item';

export default _TabItem;

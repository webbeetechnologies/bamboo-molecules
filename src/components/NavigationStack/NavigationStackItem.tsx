import { memo, ReactElement, useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from './utils';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useComponentStyles } from '../../hooks';

export type Props = ViewProps & {
    name: string;
    children: ReactElement;
};

const NavigationStackItemContainer = memo(({ name, children, ...rest }: Props) => {
    const { currentRoute } = useNavigation();

    return (
        <NavigationStackItem isCurrentRoute={currentRoute === name} children={children} {...rest} />
    );
});

const NavigationStackItem = memo(
    ({
        isCurrentRoute,
        children,
        style,
        ...rest
    }: Omit<Props, 'name'> & { isCurrentRoute: boolean }) => {
        const styles = useComponentStyles('NavigationStackItem', style);

        const opacityRef = useRef(new Animated.Value(isCurrentRoute ? 1 : 0));

        useEffect(() => {
            if (isCurrentRoute) {
                opacityRef.current.setValue(0);
            }

            Animated.timing(opacityRef.current, {
                toValue: isCurrentRoute ? 1 : 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }, [isCurrentRoute, opacityRef]);

        const animatedViewStyle = useMemo(
            () => [{ opacity: opacityRef.current }, styles],
            [styles],
        );

        return (
            <>
                {isCurrentRoute && (
                    <Animated.View style={animatedViewStyle} {...rest}>
                        {children}
                    </Animated.View>
                )}
            </>
        );
    },
);

NavigationStackItemContainer.displayName = 'NavigationStack.Item';

export default NavigationStackItemContainer;

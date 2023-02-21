import { memo, ReactElement, useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from './utils';

export type Props = {
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
    ({ isCurrentRoute, children }: Omit<Props, 'name'> & { isCurrentRoute: boolean }) => {
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

        const animatedViewStyle = useMemo(() => ({ opacity: opacityRef.current }), []);

        return (
            <>
                {isCurrentRoute && (
                    <Animated.View style={animatedViewStyle}>{children}</Animated.View>
                )}
            </>
        );
    },
);

NavigationStackItemContainer.displayName = 'NavigationStack.Item';

export default NavigationStackItemContainer;

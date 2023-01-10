import { memo, ReactElement, useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from './utils';

export type Props = {
    name: string;
    children: ReactElement;
};

const NavigationStackItem = memo(({ name, children }: Props) => {
    const { currentRoute } = useNavigation();
    const opacityRef = useRef(new Animated.Value(currentRoute === name ? 1 : 0));

    useEffect(() => {
        if (currentRoute === name) {
            opacityRef.current.setValue(0);

            Animated.timing(opacityRef.current, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }).start();

            return;
        }

        if (currentRoute !== name) {
            Animated.timing(opacityRef.current, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [currentRoute, name, opacityRef]);

    const animatedViewStyle = useMemo(() => ({ opacity: opacityRef.current }), []);

    return (
        <>
            {currentRoute === name && (
                <Animated.View style={animatedViewStyle}>{children}</Animated.View>
            )}
        </>
    );
});

NavigationStackItem.displayName = 'NavigationStack.Item';

export default NavigationStackItem;

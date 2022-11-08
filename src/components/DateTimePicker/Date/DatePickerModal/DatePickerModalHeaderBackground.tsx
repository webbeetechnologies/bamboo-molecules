import { useMemo } from 'react';
import { Animated, SafeAreaView, StyleSheet } from 'react-native';
import { useHeaderBackgroundColor } from '../../utils';

export default function DatePickerModalHeaderBackground({ children }: { children: any }) {
    const backgroundColor = useHeaderBackgroundColor();

    const { animatedContainerStyle } = useMemo(() => {
        return {
            animatedContainerStyle: [
                styles.animated,
                {
                    backgroundColor,
                },
            ],
        };
    }, [backgroundColor]);

    return (
        <Animated.View style={animatedContainerStyle}>
            <SafeAreaView style={styles.safeContent}>{children}</SafeAreaView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    animated: {
        paddingBottom: 0,
        elevation: 4,
    },
    safeContent: {
        paddingBottom: 0,
    },
});

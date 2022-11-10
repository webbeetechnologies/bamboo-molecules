import { useMemo } from 'react';
import { Animated, SafeAreaView } from 'react-native';
import { useComponentStyles } from '../../hooks';

export default function DatePickerModalHeaderBackground({ children }: { children: any }) {
    const componentStyles = useComponentStyles('DatePickerModal_HeaderBackground');

    const { animatedContainerStyle, safeContentStyle } = useMemo(() => {
        const { header, safeContent } = componentStyles;

        return {
            animatedContainerStyle: header,
            safeContentStyle: safeContent,
        };
    }, [componentStyles]);

    return (
        <Animated.View style={animatedContainerStyle}>
            <SafeAreaView style={safeContentStyle}>{children}</SafeAreaView>
        </Animated.View>
    );
}

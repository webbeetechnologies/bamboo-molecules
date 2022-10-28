import { useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';

import type { InputLabelProps } from './types';

const InputLabel = (props: InputLabelProps) => {
    const {
        parentState,
        style,
        label,
        error,
        onLayoutAnimatedText,
        hasActiveOutline,
        placeholderStyle,
        baseLabelTranslateX,
        wiggleOffsetX,
        labelScale,
        paddingOffset,
        labelTranslationXOffset,
        maxFontSizeMultiplier,
        inputHeight,
        testID,
    } = props;

    const { containerStyle, minimizedLabelStyle, normalLabelStyle } = useMemo(() => {
        const labelStyle = {
            transform: [
                {
                    // Wiggle the label when there's an error
                    translateX: parentState.error.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, parentState.value && error ? wiggleOffsetX : 0, 0],
                    }),
                },
                {
                    // Move label to top
                    translateY: parentState.labeled.interpolate({
                        inputRange: [0, 1],
                        outputRange: [inputHeight / 2 - (inputHeight / 2 + 45), 0],
                    }),
                },
                {
                    // Make label smaller
                    scale: parentState.labeled.interpolate({
                        inputRange: [0, 1],
                        outputRange: [labelScale, 1],
                    }),
                },
            ],
        };
        const labelTranslationX = {
            transform: [
                {
                    // Offset label scale since RN doesn't support transform origin
                    translateX: parentState.labeled.interpolate({
                        inputRange: [0, 1],
                        outputRange: [baseLabelTranslateX, labelTranslationXOffset || 0],
                    }),
                },
            ],
        };

        return {
            containerStyle: [
                StyleSheet.absoluteFill,
                styles.labelContainer,
                {
                    opacity:
                        // Hide the label in minimized state until we measure it's width
                        parentState.value || parentState.focused
                            ? parentState.labelLayout.measured
                                ? 1
                                : 0
                            : 1,
                },
                labelTranslationX,
            ],
            minimizedLabelStyle: [
                placeholderStyle,
                labelStyle,
                paddingOffset || {},
                {
                    opacity: parentState.labeled.interpolate({
                        inputRange: [0, 1],
                        outputRange: [hasActiveOutline ? 1 : 0, 0],
                    }),
                },
                style,
            ],
            normalLabelStyle: [
                placeholderStyle,
                {
                    opacity: parentState.focused ? 0 : 1,
                },
                labelStyle,
                paddingOffset,
                style,
            ],
        };
    }, [
        baseLabelTranslateX,
        error,
        hasActiveOutline,
        inputHeight,
        labelScale,
        labelTranslationXOffset,
        paddingOffset,
        parentState.error,
        parentState.focused,
        parentState.labelLayout.measured,
        parentState.labeled,
        parentState.value,
        placeholderStyle,
        style,
        wiggleOffsetX,
    ]);

    return label ? (
        // Position colored placeholder and gray placeholder on top of each other and crossfade them
        // This gives the effect of animating the color, but allows us to use native driver
        <Animated.View pointerEvents="none" style={containerStyle}>
            <Animated.Text
                onLayout={onLayoutAnimatedText}
                style={minimizedLabelStyle}
                numberOfLines={1}
                maxFontSizeMultiplier={maxFontSizeMultiplier}
                testID={`${testID}-label-active`}>
                {label}
            </Animated.Text>
            <Animated.Text
                // variant={parentState.focused ? 'bodyLarge' : 'bodySmall'}
                style={normalLabelStyle}
                numberOfLines={1}
                maxFontSizeMultiplier={maxFontSizeMultiplier}
                testID={`${testID}-label-inactive`}>
                {label}
            </Animated.Text>
        </Animated.View>
    ) : null;
};

const styles = StyleSheet.create({
    labelContainer: {
        zIndex: 3,
        justifyContent: 'center',
    },
});

export default InputLabel;

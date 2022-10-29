import { useState, useRef, useEffect, useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { IconProps } from './types';

type Props = IconProps;

const CrossFadeIcon = ({ color, size, name, style, ...rest }: Props) => {
    const { View, Icon } = useMolecules();
    const { animationScale: scale } = useComponentStyles('Icon', style);
    const [currentIcon, setCurrentIcon] = useState<string>(name);
    const [previousIcon, setPreviousIcon] = useState<string | null>(null);
    const { current: fade } = useRef<Animated.Value>(new Animated.Value(1));

    useEffect(() => {
        if (currentIcon !== name) {
            setPreviousIcon(() => currentIcon);
            setCurrentIcon(() => name);
        }
    }, [currentIcon, name]);

    useEffect(() => {
        if (previousIcon && previousIcon !== currentIcon) {
            fade.setValue(1);

            Animated.timing(fade, {
                duration: scale * 200,
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }
    }, [currentIcon, previousIcon, fade, scale]);

    const opacityPrev = fade;
    const opacityNext = previousIcon
        ? fade.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
          })
        : 1;

    const rotatePrev = fade.interpolate({
        inputRange: [0, 1],
        outputRange: ['-90deg', '0deg'],
    });

    const rotateNext = previousIcon
        ? fade.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '-180deg'],
          })
        : '0deg';

    const containerStyles = useMemo(
        () => [
            styles.content,
            {
                height: size,
                width: size,
            },
        ],
        [size],
    );

    const prevIconStyles = useMemo(
        () => [
            styles.icon,
            {
                opacity: opacityPrev,
                transform: [{ rotate: rotatePrev }],
            },
        ],
        [opacityPrev, rotatePrev],
    );
    const nextIconStyles = useMemo(
        () => [
            styles.icon,
            {
                opacity: opacityNext,
                transform: [{ rotate: rotateNext }],
            },
        ],
        [opacityNext, rotateNext],
    );

    return (
        <View style={containerStyles}>
            {previousIcon ? (
                <Animated.View style={prevIconStyles}>
                    <Icon name={previousIcon} size={size} color={color} {...rest} />
                </Animated.View>
            ) : null}
            <Animated.View style={nextIconStyles}>
                <Icon name={currentIcon} size={size} color={color} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default CrossFadeIcon;

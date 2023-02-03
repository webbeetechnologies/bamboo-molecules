import { forwardRef, memo, useEffect, useMemo, useRef } from 'react';
import { TextProps, ViewStyle, Animated } from 'react-native';
import type { ViewProps } from '@webbee/bamboo-atoms';

import type { MD3Elevation } from '../../core/theme/types';
import { useComponentStyles, useMolecules } from '../../hooks';
import { CallbackActionState, withActionState } from '../../hocs';
import type { SurfaceProps } from '../Surface';
import type { TouchableRippleProps } from '../TouchableRipple';
import type { IconProps, IconType } from '../Icon';

export type Props = Omit<TouchableRippleProps, 'children'> &
    CallbackActionState & {
        /**
         * name of the icon
         * */
        iconName: string;
        /**
         * type of the icon
         * */
        iconType?: IconType;
        /**
         * icon component's props
         * */
        iconProps?: Omit<IconProps, 'name' | 'type'>;
        /**
         * Label of the FAB, if provided the FAB will be on extended mode
         * */
        label?: string;
        /**
         * Props of the label
         * */
        labelProps?: Omit<Partial<TextProps>, 'children'>;
        /**
         * Props for the surface container
         * */
        containerProps?: Omit<SurfaceProps, 'style'>;
        /**
         * Props for the innner touchable container
         * */
        innerContainerStyle?: ViewStyle;
        /**
         * sizes of the FAB
         * @default 'md'
         * */
        size?: 'sm' | 'md' | 'lg';
        /**
         * variants of the FAB
         * */
        variant?: 'primary' | 'secondary' | 'tertiary' | 'surface';
        /**
         * Elevation level
         * @default 2
         * */
        elevation?: MD3Elevation;
        /**
         * Props for the state layer
         * */
        stateLayerProps?: ViewProps;
    };

const emptyObj = {};

const FAB = (
    {
        iconName,
        iconType,
        iconProps = emptyObj,
        label,
        variant = 'primary',
        size = 'md',
        elevation: elevationProp,
        containerProps,
        innerContainerStyle: innerContainerStyleProp = emptyObj,
        labelProps = emptyObj,
        stateLayerProps = emptyObj,
        hovered = false,
        disabled = false,
        onPress,
        style,
        testID,
        ...rest
    }: Props,
    ref: any,
) => {
    const { Surface, TouchableRipple, Icon, Text, View } = useMolecules();

    const initialElevation = useMemo(
        () => (elevationProp === undefined ? 3 : elevationProp),
        [elevationProp],
    );

    const { current: elevation } = useRef<Animated.Value>(new Animated.Value(initialElevation));

    const componentStyles = useComponentStyles(
        'FAB',
        [
            style,
            {
                innerContainer: innerContainerStyleProp || {},
                icon: iconProps.style || {},
                label: labelProps.style || {},
                stateLayer: stateLayerProps.style || {},
            },
        ],
        {
            variant,
            size,
            states: {
                disabled,
                hovered,
            },
        },
    );

    const {
        containerStyle,
        innerContainerStyle,
        iconStyle,
        labelStyle,
        iconSize,
        stateLayerStyle,
        animationDuration,
    } = useMemo(() => {
        const {
            innerContainer,
            iconSize: _iconSize,
            icon,
            label: _label,
            stateLayer,
            animationDuration: _animationDuration,
            ...restStyle
        } = componentStyles;

        return {
            containerStyle: restStyle,
            innerContainerStyle: innerContainer,
            iconStyle: icon,
            labelStyle: _label,
            iconSize: _iconSize,
            stateLayerStyle: stateLayer,
            animationDuration: _animationDuration,
        };
    }, [componentStyles]);

    useEffect(() => {
        if (disabled || !onPress) return;

        Animated.timing(elevation, {
            toValue: hovered ? initialElevation + 1 : initialElevation,
            duration: animationDuration,
            useNativeDriver: false,
        }).start();
    }, [variant, elevation, hovered, initialElevation, disabled, onPress, animationDuration]);

    // TODO: abstract the stateLayer
    return (
        <Surface
            testID={testID ? `${testID}-container` : ''}
            {...containerProps}
            elevation={disabled ? 0 : elevation}
            style={containerStyle}>
            <TouchableRipple
                testID={testID}
                {...rest}
                disabled={disabled}
                onPress={onPress}
                style={innerContainerStyle}
                ref={ref}>
                <>
                    <Icon
                        name={iconName}
                        type={iconType}
                        testID={testID ? `${testID}-icon` : ''}
                        {...iconProps}
                        size={iconSize}
                        style={iconStyle}
                    />
                    {label && (
                        <Text
                            selectable={false}
                            testID={testID ? `${testID}-label` : ''}
                            {...labelProps}
                            style={labelStyle}>
                            {label}
                        </Text>
                    )}
                    <View
                        testID={testID ? `${testID}-stateLayer` : ''}
                        {...stateLayerProps}
                        style={stateLayerStyle}
                    />
                </>
            </TouchableRipple>
        </Surface>
    );
};

export default memo(withActionState(forwardRef(FAB)));

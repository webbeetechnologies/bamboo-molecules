import {
    ComponentType,
    forwardRef,
    memo,
    PropsWithoutRef,
    ReactNode,
    useContext,
    useImperativeHandle,
    useMemo,
} from 'react';
import type { GestureResponderEvent, TextStyle, ViewStyle } from 'react-native';
import type { TextProps, ViewProps } from '@bambooapp/bamboo-atoms';

import type { MD3Elevation } from '../../core/theme/types';
import { useActionState, useComponentStyles, useMolecules } from '../../hooks';
import type { WithElements } from '../../types';
import type { TouchableRippleProps } from '../TouchableRipple';
import type { IconButtonProps } from '../IconButton';
import type { ActivityIndicatorProps } from '../ActivityIndicator';
import type { IconProps } from '../Icon';
import { BackgroundContext } from '../../utils';

export type Props = Omit<TouchableRippleProps, 'children'> &
    WithElements<ReactNode> & {
        /**
         * label of the chip
         * Will be truncated if it's longer than 20 characters
         */
        label: string;
        /**
         * character limit of the label
         */
        labelCharacterLimit?: number;
        /**
         * Variant of the chip.
         * - `elevated` - elevated chip with shadow and without outline.
         * - `outlined` - chip with an outline. (outline will always have elevation 0 even if it's specified)
         */
        variant?: 'elevated' | 'outlined';
        /**
         *
         * */
        size?: 'sm' | 'md';
        /**
         * callback event when the closeIcon is pressed
         */
        onClose?: () => void;
        /**
         * elevation level of the elevated chip
         */
        elevation?: MD3Elevation;
        /**
         * selected state
         */
        selected?: boolean;
        /**
         * props for the close icon
         * default is { name: 'close', onPress: onClose, disabled, accessibilityLabel: 'Close' }
         */
        closeIconProps?: Partial<IconButtonProps>;
        /**
         * props for the ActivityIndicator
         * default is { size: 18 }
         */
        activityIndicatorProps?: Partial<ActivityIndicatorProps>;
        /**
         * Whether to style the chip color as selected.
         */
        selectedColor?: string;
        /**
         * Whether to display overlay on selected chip
         */
        selectionBackgroundColor?: string;
        /**
         * Accessibility label for the chip. This is read by the screen reader when the user taps the chip.
         */
        accessibilityLabel?: string;
        /**
         * Whether the chip is disabled. A disabled chip is greyed out and `onPress` is not called on touch.
         */
        disabled?: boolean;
        /**
         * Function to execute on press.
         */
        onPress?: (e: GestureResponderEvent) => void;
        /**
         * Whether to show the ActivityIndicator or not
         */
        loading?: boolean;
        /**
         * container style
         */
        containerStyle?: ViewStyle;
        /**
         * left element container style
         */
        leftElementContainerStyle?: ViewStyle;
        /**
         * right element container style
         */
        rightElementContainerStyle?: ViewStyle;
        /**
         * label style
         */
        labelStyle?: Partial<TextStyle>;
        /**
         * Pass down testID from chip props to touchable for Detox tests.
         */
        /**
         * props for the stateLayer
         */
        stateLayerProps?: PropsWithoutRef<ViewProps>;
        testID?: string;
        containerProps?: Omit<PropsWithoutRef<ViewProps>, 'style'>;
        leftElementIconProps?: IconProps;
        rightElementIconProps?: IconProps;

        invertLabelColor?: boolean;
    };

const Chip = (
    {
        style,
        containerStyle: containerStyleProp,
        label,
        labelCharacterLimit = 20,
        variant = 'outlined',
        size = 'md',
        disabled,
        elevation: elevationProp = 1,
        left,
        right,
        loading = false,
        onClose,
        closeIconProps,
        activityIndicatorProps,
        selected = false,
        leftElementContainerStyle: leftElementContainerStyleProp,
        rightElementContainerStyle: rightElementContainerStyleProp,
        labelStyle: labelStyleProp,
        accessibilityLabel,
        selectedColor: selectedColorProp,
        selectionBackgroundColor: selectionBackgroundColorProp,
        stateLayerProps = {},
        testID = 'chip',
        containerProps,
        leftElementIconProps,
        invertLabelColor,
        ...rest
    }: Props,
    ref: any,
) => {
    const { Surface, TouchableRipple, StateLayer } = useMolecules();

    const { hovered, actionsRef } = useActionState();

    const componentStyles = useComponentStyles(
        'Chip',
        [
            style,
            {
                container: containerStyleProp || {},
                leftElement: leftElementContainerStyleProp || {},
                rightElement: rightElementContainerStyleProp || {},
                label: labelStyleProp || {},
            },
            selectionBackgroundColorProp
                ? { selectionBackgroundColor: selectionBackgroundColorProp }
                : {},
            selectedColorProp ? { selectedColor: selectedColorProp } : {},
        ],
        {
            variant,
            size,
            states: {
                disabled: !!disabled,
                selected,
                selectedAndHovered: selected && hovered,
                hovered,
            },
        },
    );

    const {
        iconSize,
        containerStyle,
        touchableRippleStyle,
        leftElementStyle,
        rightElementStyle,
        labelStyle,
        stateLayerStyle,
    } = useMemo(() => {
        const {
            iconSize: _iconSize,
            container,
            touchableRippleContainer,
            leftElement,
            rightElement,
            label: _labelStyle,
            selectionBackgroundColor,
            selectedColor,
            stateLayer,
            ...restStyle
        } = componentStyles;

        return {
            iconSize: _iconSize,
            containerStyle: [
                container,
                selected && selectionBackgroundColor
                    ? { backgroundColor: selectionBackgroundColor }
                    : {},
            ],
            touchableRippleStyle: [touchableRippleContainer, restStyle],
            leftElementStyle: leftElement,
            rightElementStyle: rightElement,
            labelStyle: [_labelStyle, selected && selectedColor ? { color: selectedColor } : {}],
            stateLayerStyle: [stateLayer, stateLayerProps?.style],
        };
    }, [componentStyles, selected, stateLayerProps?.style]);

    const { accessibilityState, elevation } = useMemo(
        () => ({
            accessibilityState: {
                selected,
                disabled,
            },
            elevation: variant === 'outlined' || disabled ? 0 : elevationProp,
        }),
        [disabled, elevationProp, selected, variant],
    );

    useImperativeHandle(ref, () => actionsRef.current);

    return (
        <Surface {...containerProps} elevation={elevation} style={containerStyle}>
            <TouchableRipple
                borderless
                {...rest}
                disabled={disabled}
                style={touchableRippleStyle}
                accessibilityLabel={accessibilityLabel}
                accessibilityRole="button"
                accessibilityState={accessibilityState}
                ref={actionsRef}
                testID={testID}>
                <>
                    <LeftElement
                        iconSize={iconSize}
                        leftElementStyle={leftElementStyle}
                        left={left}
                        activityIndicatorProps={activityIndicatorProps}
                        loading={loading}
                        selected={selected}
                        iconProps={leftElementIconProps}
                        invert={invertLabelColor}
                    />
                    <Label
                        selectable={false}
                        style={labelStyle as TextProps['style']}
                        invert={invertLabelColor}>
                        {label.length < labelCharacterLimit
                            ? `${label}`
                            : `${label.substring(0, labelCharacterLimit - 3)}...`}
                    </Label>
                    <RightElement
                        rightElementStyle={rightElementStyle}
                        accessibilityState={accessibilityState}
                        right={right}
                        disabled={disabled}
                        onClose={onClose}
                        closeIconProps={closeIconProps}
                        invert={invertLabelColor}
                    />

                    <StateLayer
                        testID={testID ? `${testID}-stateLayer` : ''}
                        {...stateLayerProps}
                        style={stateLayerStyle}
                    />
                </>
            </TouchableRipple>
        </Surface>
    );
};

type LeftElementProps = Pick<Props, 'activityIndicatorProps' | 'left' | 'loading' | 'selected'> & {
    leftElementStyle: ViewStyle;
    iconSize: number;
    iconProps?: IconProps;
    invert?: boolean;
};
const LeftElement = memo(
    ({
        iconSize,
        loading,
        left,
        selected,
        activityIndicatorProps,
        leftElementStyle,
        iconProps,
        invert,
    }: LeftElementProps) => {
        const { View, ActivityIndicator } = useMolecules();

        return loading || left || selected ? (
            <View style={leftElementStyle}>
                {loading ? (
                    <ActivityIndicator size={iconSize} {...(activityIndicatorProps || {})} />
                ) : (
                    left || (
                        <IconWithContrastColor
                            name="check"
                            size={iconSize}
                            {...iconProps}
                            invert={invert}
                        />
                    )
                )}
            </View>
        ) : (
            <></>
        );
    },
);

type RightElementProps = Pick<
    Props,
    'onClose' | 'right' | 'closeIconProps' | 'disabled' | 'accessibilityState'
> & {
    rightElementStyle: ViewStyle;
    invert?: boolean;
};
const RightElement = memo(
    ({
        onClose,
        right,
        disabled,
        closeIconProps,
        rightElementStyle,
        accessibilityState,
        invert,
    }: RightElementProps) => {
        const { View } = useMolecules();

        return onClose || right ? (
            <View style={rightElementStyle}>
                {onClose ? (
                    <IconButtonWithContrastColor
                        name="close"
                        size={18}
                        accessibilityLabel="Close"
                        disabled={disabled}
                        onPress={onClose}
                        accessibilityState={accessibilityState}
                        {...(closeIconProps || {})}
                        invert={invert}
                    />
                ) : (
                    right
                )}
            </View>
        ) : (
            <></>
        );
    },
);

const withInvertColorResolved =
    <T extends { style?: TextProps['style'] } = {}>(Component: ComponentType<T>) =>
    ({ invert, ...props }: T & { invert?: boolean }) => {
        const { color: contrastColor } = useContext(BackgroundContext);

        const componentStyle = useMemo(
            () => (!invert ? props.style : [props.style, { color: contrastColor }]),
            [invert, props.style, contrastColor],
        );

        const normalizedProps = {
            ...props,
            style: componentStyle,
        } as unknown as T;

        return <Component {...normalizedProps} />;
    };

const Label = withInvertColorResolved((props: TextProps) => {
    const { Text } = useMolecules();
    return <Text {...props} />;
});

const IconWithContrastColor = withInvertColorResolved((props: IconProps) => {
    const { Icon } = useMolecules();
    return <Icon {...props} />;
});

const IconButtonWithContrastColor = withInvertColorResolved((props: IconButtonProps) => {
    const { IconButton } = useMolecules();
    return <IconButton {...props} />;
});

export default memo(forwardRef(Chip));
